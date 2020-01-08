import React, { useEffect, useRef } from "react";
import _ from "lodash";
import "./MessageList.scss";

interface IMessageListProps {
  messages: any;
}

const MessageList: React.FC<IMessageListProps> = ({ messages }) => {
  const ref: any = React.createRef();
  useEffect(() => {
    const height = ref.current.scrollHeight;
    ref.current.scrollTo(0, height);
  }, [ref]);

  return (
    <div className="messages" ref={ref}>
      {_.map(messages, (message: any, index: number) => (
        <div key={index} className="message">
          <div>{message.date}</div>
          <div>
            <span>{message.user}{": "}</span>
            {message.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(MessageList);
