import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";

/**
 * Custom hook to check ownership of a resource.
 * 
 * This hook checks if the current user owns a specific resource or if they are an admin.
 * If the user does not own the resource and is not an admin, they are redirected to the home page.
 */
export const useCheckOwnership = (resourceId, apiEndpoint) => {
    const history = useHistory();
    const currentUser = useCurrentUser();

    useEffect(() => {
        const checkOwnership = async () => {
            try {
                // Fetch resource data to verify ownership
                const { data } = await axiosReq.get(`${apiEndpoint}/${resourceId}/`);
                // Redirect if the current user is not the owner and not an admin
                if (data.owner !== currentUser.username && !currentUser.is_admin) {
                    history.push('/');
                }
            } catch (err) {
                // Redirect if an error occurs, except for 404 (not found) errors
                if (err.response?.status !== 404) {
                    history.push('/');
                }
            }
        };

        // Check ownership only if a current user is logged in
        if (currentUser) {
            checkOwnership();
        }
    }, [resourceId, apiEndpoint, currentUser, history]);
};
