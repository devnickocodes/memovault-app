import React, { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';

import { Link } from 'react-router-dom';

import Avatar from '../../components/Avatar';

import postStyles from "../../styles/Post.module.css";
import styles from "../../styles/PopularPost.module.css";

import { scrollToTop } from '../../utils/scrollToTop';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { likePost, unlikePost } from '../../utils/LikeUnlikePostsActions';


const PopularPost = ({ post, setPosts }) => {
  const { id, is_owner, owner, profile_id, profile_image, title, content, image, post_like_id, post_likes_count, updated_at } = post;
  const [error, setError] = useState(null);
 const currentUser = useCurrentUser()
  const handleScroll = () => scrollToTop()

  const handleLike = async () => {
    try {
      await likePost(id, setPosts);
    } catch (err) {
      // console.log(err)
      setError("Failed to like the post. Please try again.");
    }
  };

  const handleUnlike = async () => {
    try {
      await unlikePost(post_like_id, id, setPosts);
    } catch (err) {
      // console.log(err)
      setError("Failed to unlike the post. Please try again.");
    }
  };

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Container className="p-3">
      {error && <Alert className={`${postStyles.Alert} ${postStyles.ErrorAlert}`}>{error}</Alert>}
      <Card className={styles.PopularPostCard}>
        <Card.Header className={styles.PopularPostHeader}>
          <Link to={`/profiles/${profile_id}/`} className={postStyles.avatarImage}>
            <Avatar src={profile_image} />
            <strong>{owner}</strong>
          </Link>
        </Card.Header>

        <Link to={`/posts/${id}/`}>
          <div className={styles.ImageWrapper}>
            <Card.Img onClick={handleScroll} variant="top" src={image} className={styles.CardImage} />
          </div>
        </Link>
        <Card.Body>
          <Card.Title className="text-center mb-3">
          {title.length > 100 ? `${title.slice(0, 20)}...` : title}
          </Card.Title>
          <Card.Text className="text-center">
            {content.length > 100 ? `${content.slice(0, 100)}...` : content}
          </Card.Text>
        </Card.Body>

        <Card.Footer className={`${styles.PopularPostFooter} d-flex justify-content-between align-items-center`}>
          <div>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className={`fa-regular fa-heart mr-1 ${postStyles.Heart}`}></i>
            </OverlayTrigger>
          ) : post_like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fa-solid fa-heart ${postStyles.Heart}`}></i>
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`fa-regular fa-heart mr-1 ${postStyles.Heart}`}></i>
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Please log in to like posts!</Tooltip>}
            >
              <i className={`fa-regular fa-heart mr-1 ${postStyles.Heart}`}></i>
            </OverlayTrigger>
          )}
          {post_likes_count}
          </div>
          <small className="text-muted">{updated_at}</small>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default PopularPost;
