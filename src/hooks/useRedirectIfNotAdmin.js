import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const useRedirectIfNotAdmin = () => {
  const history = useHistory();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser && !currentUser.is_admin) {
      history.push('/');
    }
  }, [currentUser, history]);
};

export default useRedirectIfNotAdmin;