import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";


export const PopularPostDataContext = createContext();
export const SetPopularPostDataContext = createContext();


export const usePopularPostData= () => useContext(PopularPostDataContext);
export const useSetPopularPostData = () => useContext(SetPopularPostDataContext);


export const PopularPostDataProvider = ({ children }) => {

    const [postData, setPostData] = useState({
        popularPosts: { results: [] },
      });
    
      const currentUser = useCurrentUser();

      const [error, setError] = useState(null)
    
      useEffect(() => {
        const handleMount = async () => {
          try {
            const { data } = await axiosReq.get(
              "/posts/?ordering=-post_likes_count"
            );
            setPostData((prevState) => ({
              ...prevState,
              popularPosts: data,
            }));
          } catch (err) {
            setError("An error occurred while loading popular posts. Please try again.")
          }
        };
    
        handleMount();
      }, [currentUser]);

      return (
        <PopularPostDataContext.Provider value={{postData, error}}>
            <SetPopularPostDataContext.Provider value={SetPopularPostDataContext}>
                {children}
            </SetPopularPostDataContext.Provider>
        </PopularPostDataContext.Provider>
      )

}
