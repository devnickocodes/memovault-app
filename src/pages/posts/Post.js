import React from "react";
import styles from "../../styles/Post.module.css";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

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

  return (
    <Card>
      <Card.Header className="p-2">
        <Media className="d-flex justify-content-between align-items-center">
          <Link
            to={`/profiles/${profile_id}`}
            className="d-flex align-items-center text-decoration-none"
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
    </Card>
  );
};

export default Post;
