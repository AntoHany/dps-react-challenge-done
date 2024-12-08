import React from "react";
import "../styles.css";

interface ControlsProps {
  users: { city: string }[];
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  setCityFilter: React.Dispatch<React.SetStateAction<string>>;
  setHighlightOldest: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls: React.FC<ControlsProps> = ({
  users,
  setNameFilter,
  setCityFilter,
  setHighlightOldest,
}) => {
  const uniqueCities = Array.from(
    new Set(users.map((user) => user.city))
  ).sort();

  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search by name"
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <select onChange={(e) => setCityFilter(e.target.value)}>
        <option value="">Select city</option>
        {uniqueCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <label>
        <input
          type="checkbox"
          onChange={(e) => setHighlightOldest(e.target.checked)}
        />
        Highlight oldest per city
      </label>
    </div>
  );
};

export default Controls;
