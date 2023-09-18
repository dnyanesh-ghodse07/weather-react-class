import React from "react";

const Input = ({ location, setLocation }) => {
  return (
    <input
      type="search"
      className="input-location"
      value={location}
      placeholder="Search location"
      onChange={(e) => setLocation(e?.target?.value)}
    />
  );
};

export default Input;
