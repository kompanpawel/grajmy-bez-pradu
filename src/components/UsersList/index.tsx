import React from "react";
import _ from "lodash";

const UsersList: React.FC<any> = ({ users }) => {
  return (
    <ul>
      {_.map(users, (user: any) => (
        <li key={user.uid}>
          <span>
            <strong>ID: </strong>
            {user.uid}
          </span>
          <span>
            <strong>E-mail: </strong>
            {user.email}
          </span>
          <span>
            <strong>Username: </strong>
            {user.username}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
