import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";

export const useCheckOwnership = (resourceId, apiEndpoint) => {
    const history = useHistory();
    const currentUser = useCurrentUser();

    useEffect(() => {
        const checkOwnership = async () => {
            try {
                const { data } = await axiosReq.get(`${apiEndpoint}/${resourceId}/`);
                if (data.owner !== currentUser.username && !currentUser.is_admin) {
                    history.push('/');
                }
            } catch (err) {
                if (err.response?.status !== 404) {
                    history.push('/');
                }
            }
        };

        if (currentUser) {
            checkOwnership();
        }
    }, [resourceId, apiEndpoint, currentUser, history]);
};
