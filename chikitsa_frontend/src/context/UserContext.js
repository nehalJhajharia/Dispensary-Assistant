// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user_id, setUserId] = useState(0);

  return (
    <UserContext.Provider value={{ user_id, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};