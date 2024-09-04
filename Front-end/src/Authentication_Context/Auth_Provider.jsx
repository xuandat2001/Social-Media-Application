import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    setUser({ userName: username });
  };
  
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, login, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
