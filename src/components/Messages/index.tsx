import React, { useCallback, useEffect, useState } from "react";
import { compose } from "recompose";
import { withFirebase } from "components/Firebase";
import { InputAdornment, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import "./Messages.scss";
import { v1 } from "uuid";
import moment from "moment";
import _ from "lodash";
import MessageList from "./MessageList";

const Messages: React.FC<any> = ({ firebase, sessionID }) => {
  const [message, setMessage] = useState("");
  const [fetchedMessages, setFetchedMessages] = useState([{}]);

  useEffect(() => {
    firebase
      .session(sessionID)
      .child("messages")
      .on("value", (snapshot: any) => {
        if (!_.isNil(snapshot.val())) {
          setFetchedMessages([{}])
          const data = snapshot.val();
          _.forEach(data,(item: any) => {
            firebase.user(item.user).once("value", (userSnapshot: any) => {
              setFetchedMessages((state) => {
                return state.concat({
                  message: item.content,
                  date: item.date,
                  user: userSnapshot.val().username,
                  id: item.id
                });
              });
            });
          });
        }
      });
  }, [firebase, sessionID]);

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };


  const sendMessage = useCallback(() => {
    const uuid = v1();
    const userID = firebase.auth.currentUser.uid;
    const date = moment().format("D.MM.YYYY H:mm:ss");
    firebase
      .session(sessionID)
      .child("messages")
      .push({
        id: uuid,
        user: userID,
        date: date,
        content: message,
      })
      .then(() => {
        setMessage("");
      });
  }, [firebase, message, sessionID]);

  const prepareData = () => {
    return fetchedMessages.filter((message: any) => {
      return !_.isEmpty(message)
    }).sort((a: any, b: any) => {
      const firstDate: any = moment(a.date, "D.MM.YYYY H:mm:ss").toDate();
      const secondDate: any = moment(b.date, "D.MM.YYYY H:mm:ss").toDate();
      return firstDate - secondDate;
    })
  };
  const handleKeyPressed = (event: any) => {
    if (event.keyCode === 13) {
      sendMessage();
    }
  }

  return (
    <div className="messages-container">
      <MessageList messages={prepareData()} />
      <TextField
        className="text-field"
        variant="outlined"
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyPressed}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={sendMessage}>
              <SendIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default compose<any, any>(withFirebase)(React.memo(Messages));
