//UrlContext.js
import React, { createContext} from 'react';

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  // const url = 'http://192.168.199.8:8000/'; 
  const url = 'http://localhost:8000/'; 

  return (
    <UrlContext.Provider value={url}>
      {children}
    </UrlContext.Provider>
  );
};

export default UrlContext;
