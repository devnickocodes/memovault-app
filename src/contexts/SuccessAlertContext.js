import React, {
  createContext, useContext, useState, useEffect,
} from 'react';

// Create context for success alert
const SuccessAlertContext = createContext();

/**
 * SuccessAlertProvider component to manage and provide success alert state.
 *
 * This component manages the state of success alerts, including displaying
 * and automatically hiding the alert after a set time. It provides the
 * `alert` state and `setAlert` function to its children via context.
 *
 * The `useEffect` hook is used to clear the alert message after 3 seconds
 * if an alert message is present.
 */
export const SuccessAlertProvider = ({ children }) => {
  // State to store the success alert message
  const [alert, setAlert] = useState({ message: null });

  useEffect(() => {
    // Automatically clear the alert message after 3 seconds
    let timer;
    if (alert.message) {
      timer = setTimeout(() => setAlert({ message: null }), 3000);
    }
    return () => clearTimeout(timer);
  }, [alert.message]);

  return (
    <SuccessAlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </SuccessAlertContext.Provider>
  );
};

/**
 * Custom hook to access the success alert context.
 *
 * This hook provides access to the `alert` state and `setAlert` function
 * from the SuccessAlertContext.
 */
export const useSuccessAlert = () => useContext(SuccessAlertContext);
