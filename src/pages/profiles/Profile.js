import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from "../../components/Avatar";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Button } from 'react-bootstrap';
import btnStyles from "../../styles/Button.module.css"

const Profile = (props) => {
    const { profile, mobile } = props;
    const { id, following_id, image, owner, is_owner } = profile;
    const currentUser = useCurrentUser();
    
    return (
        <div className={`d-flex ${mobile ? 'flex-column align-items-center' : 'align-items-center my-3'}`}>
            <div className={`d-flex align-items-center ${mobile ? 'mb-2' : 'mr-3'}`}>
                <Link to={`/profiles/${id}/`}>
                    <Avatar src={image} />
                </Link>
            </div>
            <div className={`d-flex align-items-center ${mobile ? 'mb-2' : ''}`}>
                <p className="mb-0">{owner}</p>
            </div>
            {!mobile && currentUser && !is_owner && (
                <div className="ml-auto">
                    {following_id ? (
                        <Button onClick={() => {}}>Unfollow</Button>
                    ) : (
                        <Button className={btnStyles.Button} onClick={() => {}}>Follow</Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Profile;
