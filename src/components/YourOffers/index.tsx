import React, { useEffect, useState } from "react";
import _ from "lodash";
import OfferCard from "components/OfferCard";
import { withFirebase } from "components/Firebase";

const YourOffers: React.FC<any> = ({ firebase }) => {
  const [userID, setUserID] = useState("");
  const [offersList, setOffersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUserID(user.uid.toString());
        firebase
          .sessions()
          .orderByChild("user")
          .equalTo(userID)
          .on("value", (snapshot: any) => {
            const array: any = [];
            snapshot.forEach((item: any) => {
              array.push(item.val());
            });
            setOffersList(array);
            setLoading(false);
          });
      } else {
        console.log("No user is signed in");
      }
    });
  }, [firebase, userID]);

  return (
    <div>
      {_.map(offersList, (offer: any) => (
        <WrappedOfferCard data={offer} />
      ))}
    </div>
  );
};

const WrappedOfferCard = withFirebase(OfferCard);

export default React.memo(YourOffers);
