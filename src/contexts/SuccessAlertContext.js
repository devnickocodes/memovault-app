import React, { createContext, useContext, useState, useEffect } from 'react';

const SuccessAlertContext = createContext();

export const SuccessAlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: null });

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ message: null }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.message]);

  return (
    <SuccessAlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </SuccessAlertContext.Provider>
  );
};

export const useSuccessAlert = () => useContext(SuccessAlertContext);
