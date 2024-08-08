import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
        mostPosts: { results: [] }
    });
    const [popularProfilesError, setPopularProfilesError] = useState(null);
    const [mostPostsError, setMostPostsError] = useState(null);

    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data: followersData } = await axiosReq.get('/profiles/?ordering=-followers_count');
                setProfileData(prevState => ({
                    ...prevState,
                    popularProfiles: followersData
                }));
                setPopularProfilesError(null);
            } catch {
                setPopularProfilesError("An error occurred while loading popular profiles. Please try again.");
            }

            try {
                const { data: postsData } = await axiosReq.get('/profiles/?ordering=-posts_count');
                setProfileData(prevState => ({
                    ...prevState,
                    mostPosts: postsData
                }));
                setMostPostsError(null);
            } catch {
                setMostPostsError("An error occurred while loading profiles with most posts. Please try again.");
            }
        };
        handleMount();
    }, [currentUser]);

    return (
        <ProfileDataContext.Provider value={{ profileData, popularProfilesError, mostPostsError }}>
            <SetProfileDataContext.Provider value={setProfileData}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};
