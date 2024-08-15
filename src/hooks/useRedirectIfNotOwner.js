import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";

export const useRedirectIfNotOwner = (postId) => {
    const history = useHistory();
    const currentUser = useCurrentUser();

    useEffect(() => {
        const checkOwnership = async () => {
            try {
                const { data } = await axiosRes.get(`/posts/${postId}/`);
                if (data.owner === currentUser.username) {
                    history.goBack();
                }
            } catch (err) {
                history.goBack();
            }
        };

        if (currentUser) {
            checkOwnership();
        }
    }, [postId, currentUser, history]);
};