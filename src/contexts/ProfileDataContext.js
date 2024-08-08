import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";




export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();


export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);




export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        pageProfile: {results: []},
        popularProfiles: {results: []},
        mostPosts: {results: []}
    })
 
    const currentUser = useCurrentUser()

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data: followersData } = await axiosReq.get('/profiles/?ordering=-followers_count');
                const { data: postsData } = await axiosReq.get('/profiles/?ordering=-posts_count');
                setProfileData(prevState => ({
                    ...prevState,
                    popularProfiles: followersData,
                    mostPosts: postsData
                }))
            } catch(err) {
                console.log(err)
            }
        }
        handleMount()
    }, [currentUser])

    return (
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={setProfileData}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
      )
}










