import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

/**
 * Custom hook to handle redirection based on user authentication status.
 * 
 * This hook attempts to refresh the user's authentication token and redirects
 * based on the provided `userAuthStatus`. If the token refresh is successful
 * and the user is logged in, it redirects to the home page. If the token refresh
 * fails and the user is logged out, it also redirects to the home page.
 */
export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                // Attempt to refresh the authentication token
                await axios.post('/dj-rest-auth/token/refresh/');
                
                // Redirect to home if user is logged in
                if (userAuthStatus === 'loggedIn') {
                    history.push('/');
                }
            } catch (err) {
                // Redirect to home if token refresh fails and user is logged out
                if (userAuthStatus === 'loggedOut') {
                    history.push('/');
                }
            }
        };

        handleMount();
    }, [history, userAuthStatus]);
};
