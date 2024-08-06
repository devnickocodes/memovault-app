import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { Card, Media, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const Post = (props) => {
  const {
    id,
    owner,
    is_owner,
    is_admin,
    profile_id,
    profile_image,
    comments_count,
    post_likes_count,
    post_like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const [errors, setErrors] = useState(null);

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/like/post/', { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, post_likes_count: post.post_likes_count + 1, post_like_id: data.id }
            : post
        ),
      }));
    } catch (err) {
        setErrors("Failed to like the post. Please try again.");
    }
  };

  const handleUnlike = async () => {
    try {
        await axiosRes.delete(`/like/post/${post_like_id}`)
        setPosts((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) =>
              post.id === id
                ? { ...post, post_likes_count: post.post_likes_count - 1, post_like_id: null }
                : post
            ),
          }));
    } catch(err){
        setErrors("Failed to unlike the post. Please try again.");
    }
  } 

  return (
    <Card className={styles.Container}>
      <Card.Header className="p-2">
        <Media className="d-flex justify-content-between align-items-center">
          <Link
            to={`/profiles/${profile_id}`}
            className={`d-flex align-items-center text-decoration-none ${styles.avatarImage}`}
          >
            <Avatar src={profile_image} />
            <span>{owner}</span>
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && <span>...</span>}
            {is_admin && postPage && <span>...</span>}
          </div>
        </Media>
      </Card.Header>
      <Link to={`/posts/${id}`}>
        <Card.Img variant="top" src={image} alt={title} />
      </Link>
      <Card.Body className="text-center">
        {title && <Card.Title>{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
      <div className="text-center">
        {is_owner ? (
          <OverlayTrigger placement="top" overlay={<Tooltip>You can't like your own post!</Tooltip>}>
            <i className={`fa-regular fa-heart mr-1 ${styles.Heart}`}></i>
          </OverlayTrigger>
        ) : post_like_id ? (
          <span onClick={handleUnlike}>
            <i className={`fa-solid fa-heart ${styles.Heart}`}></i>
          </span>
        ) : currentUser ? (
          <span onClick={handleLike}>
            <i className={`fa-regular fa-heart mr-1 ${styles.Heart}`}></i>
          </span>
        ) : (
          <OverlayTrigger placement="top" overlay={<Tooltip>Please log in to like posts!</Tooltip>}>
            <i className={`fa-regular fa-heart mr-1 ${styles.Heart}`}></i>
          </OverlayTrigger>
        )}
        {post_likes_count}
        <Link to={`/posts/${id}`}>
          <i className={`fa-regular fa-comment ml-2 mr-2 ${styles.Comment}`}></i>
        </Link>
        {comments_count}
      </div>
      {errors && (
          <Alert className="mt-2 text-center" variant="warning">
            {errors}
          </Alert>
        )}
    </Card>
  );
};

export default Post;
