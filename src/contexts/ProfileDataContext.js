import {
  React, createContext, useContext, useEffect, useState,
} from 'react';
import { useCurrentUser } from './CurrentUserContext';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { followHelper, unfollowHelper } from '../utils/utils';
import { useSuccessAlert } from './SuccessAlertContext';

// Create context for profile data and for updating profile data
export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

// Custom hook to access the profile data context
export const useProfileData = () => useContext(ProfileDataContext);

// Custom hook to access the context for setting profile data and handling follow/unfollow actions
export const useSetProfileData = () => useContext(SetProfileDataContext);

/**
 * ProfileDataProvider component to manage and provide profile data.
 *
 * This component fetches profile data including popular profiles and profiles
 * with most posts.
 * It provides functions to handle following and unfollowing profiles, and updates the profile
 * data state accordingly.
 * The `useEffect` hook is used to fetch the profile data when the component mounts
 * or when `currentUser` changes.
 * Error handling is included for the API calls, and errors are stored in
 * the respective error states.
 */
export const ProfileDataProvider = ({ children }) => {
  // State to store profile data, including page profile, popular profiles,
  // and profiles with most posts
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
    mostPosts: { results: [] },
  });

  // State to manage error messages
  const [followUnfollowError, setFollowUnfollowError] = useState(null);

  // Hook to manage success alerts
  const { setAlert } = useSuccessAlert();

  // State to store error messages for popular profiles and profiles with most posts
  const [popularProfilesError, setPopularProfilesError] = useState(null);
  const [mostPostsError, setMostPostsError] = useState(null);

  // Get current user context
  const currentUser = useCurrentUser();

  /**
   * Function to handle following a profile.
   *
   * This function makes an API call to follow a profile and updates the profile data state
   * to reflect the new follow relationship.
   *
   * The `followHelper` function is used to update the follow status in the profile data.
   */
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosReq.post('/followers/', {
        followed: clickedProfile.id,
      });
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) => followHelper(profile, clickedProfile, data.id)),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) => followHelper(profile, clickedProfile, data.id)),
        },
        mostPosts: {
          ...prevState.mostPosts,
          results: prevState.mostPosts.results.map((profile) => followHelper(profile, clickedProfile, data.id)),
        },
      }));
      setAlert({ message: 'User followed!' });
    } catch (err) {
      // console.log(err);
      setFollowUnfollowError('Sorry an error occurred. Please try again.');
    }
  };

  /**
   * Function to handle unfollowing a profile.
   *
   * This function makes an API call to unfollow a profile and updates the profile data state
   * to reflect the new unfollow relationship.
   *
   * The `unfollowHelper` function is used to update the unfollow status in the profile data.
   */
  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) => unfollowHelper(profile, clickedProfile)),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) => unfollowHelper(profile, clickedProfile)),
        },
        mostPosts: {
          ...prevState.mostPosts,
          results: prevState.mostPosts.results.map((profile) => unfollowHelper(profile, clickedProfile)),
        },
      }));
      setAlert({ message: 'User unfollowed!' });
    } catch (err) {
      // console.log(err);
      setFollowUnfollowError('Sorry an error occurred. Please try again.');
    }
  };

  useEffect(() => {
    /**
     * Function to fetch profile data on mount or when `currentUser` changes.
     *
     * Fetches popular profiles and profiles with most posts from the API. Updates
     * the profile data state and error states accordingly.
     */
    const handleMount = async () => {
      try {
        const { data: followersData } = await axiosReq.get(
          '/profiles/?ordering=-followers_count',
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: followersData,
        }));
        setPopularProfilesError(null);
      } catch (err) {
        // console.log(err)
        setPopularProfilesError(
          'An error occurred while loading popular profiles.',
        );
      }

      try {
        const { data: postsData } = await axiosReq.get(
          '/profiles/?ordering=-posts_count',
        );
        setProfileData((prevState) => ({
          ...prevState,
          mostPosts: postsData,
        }));
        setMostPostsError(null);
      } catch (err) {
        // console.log(err)
        setMostPostsError(
          'An error occurred while loading profiles with most posts.',
        );
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider
      value={{
        profileData, popularProfilesError, mostPostsError, followUnfollowError, setFollowUnfollowError,
      }}
    >
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
