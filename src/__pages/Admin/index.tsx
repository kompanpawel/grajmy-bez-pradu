import React, { useEffect, useState } from "react";
import { withFirebase } from "components/Firebase";
import UsersList from "components/UsersList";

const AdminPage: React.FC<any> = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    firebase.users().on("value", (snapshot: any) => {
      const usersObject = snapshot.val();
      const usersList: any = Object.keys(usersObject).map((key: string) => ({
        ...usersObject[key],
        uid: key,
      }));
      setUsers(usersList);
      setLoading(false);
    });
    return () => firebase.users().off();
  }, [firebase]);

  return (
    <div>
      <h1>Admin</h1>
      {loading && <div>Loading ...</div>}

      <UsersList users={users} />
    </div>
  );
};

export default withFirebase(AdminPage);
