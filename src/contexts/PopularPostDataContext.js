import {
  React, createContext, useContext, useEffect, useState,
} from 'react';
import { useCurrentUser } from './CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';

// Create context for popular post data and for updating the popular post data
export const PopularPostDataContext = createContext();
export const SetPopularPostDataContext = createContext();

// Custom hook to access the popular post data context
export const usePopularPostData = () => useContext(PopularPostDataContext);

// Custom hook to access the context for setting the popular post data
export const useSetPopularPostData = () => useContext(SetPopularPostDataContext);

/**
 * PopularPostDataProvider component to manage and provide popular post data.
 *
 * This component fetches popular post data on mount and provides the data along
 * with any error messages to its children via context.
 *
 * The `useEffect` hook is used to fetch popular posts from the API when the
 * component mounts or when `currentUser` changes. The fetched data is stored in
 * the `postData` state, and any errors during the fetch are stored in the `error` state.
 */
export const PopularPostDataProvider = ({ children }) => {
  // State to store popular post data and error messages
  const [postData, setPostData] = useState({
    popularPosts: { results: [] },
  });
  const [error, setError] = useState(null);

  // Get current user context
  const currentUser = useCurrentUser();

  /**
   * Function to fetch popular posts from the API.
   *
   * This function makes an API call to get the popular posts and updates the
   * `postData` state with the fetched data. If an error occurs during the fetch,
   * it updates the `error` state with an error message.
   */
  const handleMount = async () => {
    try {
      const { data } = await axiosReq.get('/posts/?ordering=-post_likes_count');
      setPostData((prevState) => ({
        ...prevState,
        popularPosts: data,
      }));
    } catch (err) {
      // console.log(err)
      setError(
        'An error occurred while loading popular posts. Please try again.',
      );
    }
  };

  useEffect(() => {
    handleMount();
  }, [currentUser]);

  return (
    <PopularPostDataContext.Provider value={{ postData, error }}>
      <SetPopularPostDataContext.Provider value={SetPopularPostDataContext}>
        {children}
      </SetPopularPostDataContext.Provider>
    </PopularPostDataContext.Provider>
  );
};
