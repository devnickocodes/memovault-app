import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

export const useRedirectIfNotAdmin = (apiEndpoint, redirectTo) => {
    const history = useHistory();
    const currentUser = useCurrentUser();

    useEffect(() => {
        const checkIfAdmin = () => {
            if (apiEndpoint.includes('/admin') && (!currentUser || !currentUser.is_admin)) {
                history.push(redirectTo);
            }
        };

        checkIfAdmin();
    }, [apiEndpoint, currentUser, history, redirectTo]);
};