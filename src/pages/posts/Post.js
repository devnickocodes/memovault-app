import React, { useEffect, useState } from "react";
import { Card, Media, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Post.module.css";
import { DropdownOptions } from "../../components/DropdownOptions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
  const history = useHistory()

  useEffect(() => {
    let timer;
    if (errors) {
      timer = setTimeout(() => setErrors(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [errors]);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`)
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/pots/${id}`)
      history.goBack()
    } catch (err) {
      setErrors("Something went wrong while trying to delete the post. Please try again in a moment.")
    }
  }

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/like/post/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? {
                ...post,
                post_likes_count: post.post_likes_count + 1,
                post_like_id: data.id,
              }
            : post
        ),
      }));
    } catch (err) {
      setErrors("Failed to like the post. Please try again.");
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/like/post/${post_like_id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? {
                ...post,
                post_likes_count: post.post_likes_count - 1,
                post_like_id: null,
              }
            : post
        ),
      }));
    } catch (err) {
      setErrors("Failed to unlike the post. Please try again.");
    }
  };

  return ( <>
    <div>
    {errors && (
        <Alert className={`mt-2 text-center ${styles.Alert}`}>
          {errors}
        </Alert>
      )}
    </div>
    <Card className={`mb-4 ${styles.Container} m-3`}>
      <Card.Header className={`p-2 ${styles.CardHeader}`}>
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
            {postPage && (is_owner || is_admin) && (
              <DropdownOptions isAdmin={is_admin} handleEdit={handleEdit} handleDelete={handleDelete} />
            )}
          </div>
        </Media>
      </Card.Header>
      <Link to={`/posts/${id}`}>
        <Card.Img variant="top" src={image} alt={title} className={styles.CardImg} />
      </Link>
      <Card.Body className={`text-center ${styles.CardBody}`}>
        {title && <Card.Title className={styles.CardTitle}>{title}</Card.Title>}
        {content && <Card.Text className={styles.CardText}>{content}</Card.Text>}
      </Card.Body>
      <div className={`text-center ${styles.CardBody}`}>
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't like your own post!</Tooltip>}
          >
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
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Please log in to like posts!</Tooltip>}
          >
            <i className={`fa-regular fa-heart mr-1 ${styles.Heart}`}></i>
          </OverlayTrigger>
        )}
        {post_likes_count}
        <Link to={`/posts/${id}`}>
          <i className={`fa-regular fa-comment ml-2 mr-2 ${styles.Comment}`}></i>
        </Link>
        {comments_count}
        {currentUser ? (
          <Link to={`/reports/create/${id}`}>
            <i className={`fa-solid fa-flag ml-2 mr-2 ${styles.Flag}`}></i>
          </Link>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Please log in to report posts!</Tooltip>}
          >
            <Link to={"/signin"}>
              <i className={`fa-solid fa-flag ml-2 mr-2 ${styles.Flag}`}></i>
            </Link>
          </OverlayTrigger>
        )}
      </div>
    </Card>
    </>
  );
};

export default Post;
