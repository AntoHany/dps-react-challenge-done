import React from "react";
import "../styles.css";

interface User {
  name: string;
  city: string;
  birthday: string;
}

interface TableProps {
  users: User[];
  highlightOldest: boolean;
}

const Table: React.FC<TableProps> = ({ users, highlightOldest }) => {
  const getOldestUsers = (): Record<string, User> => {
    const oldest: Record<string, User> = {};
    users.forEach((user) => {
      const userDate = new Date(user.birthday);
      if (
        !oldest[user.city] ||
        userDate < new Date(oldest[user.city].birthday)
      ) {
        oldest[user.city] = user;
      }
    });
    return oldest;
  };

  const oldestUsers = highlightOldest ? getOldestUsers() : {};

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Birthday</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={index}
            className={`table-row ${
              highlightOldest && oldestUsers[user.city]?.name === user.name
                ? "highlight"
                : ""
            }`}
          >
            <td>{user.name}</td>
            <td>{user.city}</td>
            <td>{user.birthday}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
