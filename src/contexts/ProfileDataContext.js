import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

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

    const handleFollow = async (clickedProfile) => {
        try{
            const {data} = await axiosRes.post('followers/', {
                followed: clickedProfile.id
            })

            setProfileData(prevState => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map(profile => {
                        return profile.id === clickedProfile.id
                        ?
                        {
                            ...profile,
                            followers_count: profile.followers_count + 1,
                            following_id: data.id
                        }
                        : profile.is_owner
                        ?
                        {
                            ...profile,
                            following_count: profile.following_count + 1
                        }
                        :
                        profile
                    })
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map(profile => {
                        return profile.id === clickedProfile.id
                        ?
                        {
                            ...profile,
                            followers_count: profile.followers_count + 1,
                            following_id: data.id
                        }
                        : profile.is_owner
                        ?
                        {
                            ...profile,
                            following_count: profile.following_count + 1
                        }
                        :
                        profile
                    })
                }
            }))
        } catch (err) {
            console.log(err)
        }
    }

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
            <SetProfileDataContext.Provider value={{setProfileData, handleFollow}}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};
