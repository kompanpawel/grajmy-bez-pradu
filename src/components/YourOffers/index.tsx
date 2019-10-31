import React, { useEffect, useState } from "react";
import _ from "lodash";

const YourOffers: React.FC<any> = ({ firebase }) => {
  const [userID, setUserID] = useState("");
  const [offersList, setOffersList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUserID(user.uid.toString());
        firebase
          .offers()
          .orderByChild("user")
          .equalTo(userID)
          .on("value", (snapshot: any) => {
            const array: any = [];
            snapshot.forEach((item: any) => {
              array.push(item.val());
            });
            setOffersList(array);
          });
        offersList !== [] && setLoading(false);
      } else {
        console.log("No user is signed in");
      }
    });
  }, [firebase, userID]);

  return <div>{!loading && "Twoje oferty"}</div>;
};

export default React.memo(YourOffers);
