import React from "react";
import styles from "../../styles/Post.module.css";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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
  } = props;

  const currentUser = useCurrentUser()

  return (
    <Card>
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
        ): post_like_id ? (
            <span onClick={() => {}}>
                <i className={`fa-solid fa-heart ${styles.Heart}`}></i>
            </span>
        ): currentUser ? (
            <span onClick={() => {}}>
                <i className={`fa-regular fa-heart mr-1 ${styles.Heart}`}></i>
            </span>
        ): (
            <OverlayTrigger placement="top" overlay={<Tooltip>Please log in to like posts!</Tooltip>}>
                <i className={`fa-regular fa-heart mr-1 ${styles.Heart}`}></i>
            </OverlayTrigger>
        )}
        {post_likes_count}
        <Link to={`/posts/${id}`}>
        <i class={`fa-regular fa-comment ml-2 mr-2 ${styles.Comment}`}></i>
        </Link>
        {comments_count}
      </div>
    </Card>
  );
};

export default Post;
