import React, { useEffect, useState } from "react";
import Controls from "./components/Controls";
import Table from "./components/Table";
import "./styles.css";

interface User {
  name: string;
  city: string;
  birthday: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [highlightOldest, setHighlightOldest] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        const formattedUsers: User[] = data.users.map((user: any) => ({
          name: `${user.firstName} ${user.lastName}`,
          city: user.address.city,
          birthday: user.birthDate,
        }));
        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const updatedUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (!cityFilter || user.city === cityFilter)
    );
    setFilteredUsers(updatedUsers);
  }, [nameFilter, cityFilter, users]);

  return (
    <div>
      <Controls
        users={users}
        setNameFilter={setNameFilter}
        setCityFilter={setCityFilter}
        setHighlightOldest={setHighlightOldest}
      />
      <Table users={filteredUsers} highlightOldest={highlightOldest} />
    </div>
  );
};

export default App;
