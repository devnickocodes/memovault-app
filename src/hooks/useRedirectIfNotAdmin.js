import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

/**
 * Custom hook to redirect users who are not admins away from admin pages.
 * 
 * This hook checks if the current user is an admin and if the requested
 * API endpoint is an admin route. If the user is either not logged in or
 * logged in but not an admin, they are redirected to a specified URL.
 */
export const useRedirectIfNotAdmin = (apiEndpoint, redirectTo) => {
    const history = useHistory();
    const currentUser = useCurrentUser();

    useEffect(() => {
        const checkIfAdmin = () => {
            // Redirect if the API endpoint includes '/admin' and the user is not an admin or not logged in
            if (apiEndpoint.includes('/admin') && (!currentUser || !currentUser.is_admin)) {
                history.push(redirectTo);
            }
        };

        checkIfAdmin();
    }, [apiEndpoint, currentUser, history, redirectTo]);
};
