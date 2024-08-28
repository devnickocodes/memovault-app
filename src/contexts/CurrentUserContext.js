import {
  React, createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/utils';

// Create context for current user and for updating the current user
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hook to access the current user context
export const useCurrentUser = () => useContext(CurrentUserContext);

// Custom hook to access the context for setting the current user
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

/**
 * CurrentUserProvider component to manage the current user state and authentication.
 *
 * This component fetches the current user information on mount, sets up interceptors
 * for handling token refresh and unauthorized errors, and provides the current user and
 * a function to update the current user to its children via context.
 *
 * The `useMemo` hook is used to set up interceptors for request and response handling,
 * ensuring the token is refreshed when necessary and handling unauthorized errors.
 */
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  /**
   * Function to fetch the current user information from the API.
   *
   * This function makes an API call to get the user data and sets the currentUser state.
   */
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    // Set up request interceptor to refresh token if needed
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (error) {
            // console.log(error)
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Set up response interceptor to handle unauthorized errors and refresh token if needed
    axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (refreshError) {
            // console.log(refreshError)
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(error.config);
        }
        return Promise.reject(error);
      },
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
