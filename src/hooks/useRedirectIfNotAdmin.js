import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

export const useRedirectIfNotAdmin = (redirectPath = "/") => {
    const history = useHistory();
    const currentUser = useCurrentUser();

    useEffect(() => {

        const checkAdminStatus = () => {
            if (!currentUser?.is_admin) {
                history.push(redirectPath);
            }
        };

        if (currentUser) {
            checkAdminStatus();
        }
    }, [currentUser, history, redirectPath]);
};