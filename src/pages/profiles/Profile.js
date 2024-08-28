import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from "../../components/Avatar";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Button from 'react-bootstrap/Button';
import btnStyles from "../../styles/Button.module.css";
import { useSetProfileData } from '../../contexts/ProfileDataContext';
import { scrollToTop } from '../../utils/scrollToTop';
import postStyles from "../../styles/Post.module.css"

const Profile = (props) => {
    const { profile, mobile } = props;
    const { id, following_id, image, owner, is_owner } = profile;
    const currentUser = useCurrentUser();
    const handleScroll = () => scrollToTop();

    // Extract handleFollow and handleUnfollow functions from ProfileDataContext
    const { handleFollow, handleUnfollow } = useSetProfileData();

    return (
        <div className={`d-flex ${mobile ? 'flex-column align-items-center' : 'align-items-center my-3'}`}>
            {/* Profile image and link to profile page */}
            <div className={`d-flex align-items-center ${mobile ? 'mb-2' : 'mr-3'}`}>
                <Link className={postStyles.avatarImage} onClick={handleScroll} to={`/profiles/${id}/`}>
                    <Avatar src={image} />
                </Link>
            </div>
            {/* Profile owner's name */}
            <div className={`d-flex align-items-center ${mobile && 'mb-2'}`}>
                <p className="mb-0">{owner}</p>
            </div>
            {/* Follow/Unfollow button, shown only for non-mobile views */}
            {!mobile && currentUser && !is_owner && (
                <div className="ml-auto p-2">
                    {following_id ? (
                        // Button to unfollow if currently following the profile
                        <Button className={`${btnStyles.Button} ${btnStyles.GreyButton}`} onClick={() => handleUnfollow(profile)}>unfollow</Button>
                    ) : (
                        // Button to follow if not currently following the profile
                        <Button className={btnStyles.Button} onClick={() => handleFollow(profile)}>follow</Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Profile;
