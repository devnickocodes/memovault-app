import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Media from "react-bootstrap/Media";
import Alert from "react-bootstrap/Alert";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import Avatar from "../../components/Avatar";
import { DropdownOptions } from "../../components/DropdownOptions";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";
import ConfirmationModal from "../../utils/ConfirmationModal";

import styles from "../../styles/Comment.module.css";
import postStyles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    is_owner,
    is_admin,
    id,
    setPost,
    setComments,
    comment_likes_count,
    comment_like_id,
  } = props;

  const currentUser = useCurrentUser()
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComment) => ({
        ...prevComment,
        results: prevComment.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      // console.log(err)
      setError("Sorry, there was an error trying to delete the comment. Please try again.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/like/comment/", { comment: id });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) =>
          comment.id === id
            ? {
                ...comment,
                comment_likes_count: comment.comment_likes_count + 1,
                comment_like_id: data.id,
              }
            : comment
        ),
      }));
    } catch(err) {
      // console.log(err)
      setError("Failed to like the comment. Please try again.");
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/like/comment/${comment_like_id}`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) =>
          comment.id === id
            ? {
                ...comment,
                comment_likes_count: comment.comment_likes_count - 1,
                comment_like_id: null,
              }
            : comment
        ),
      }));
    } catch (err) {
      // console.log(err)
      setError("Failed to unlike the comment. Please try again.");
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
    <>
    <div className={`${styles.CommentContainer} p-3 mb-3`}>
      {error && (
        <Alert className={`mt-2 text-center ${postStyles.Alert} ${postStyles.ErrorAlert}`}>
          {error}
        </Alert>
      )}
      <Media className="align-items-start">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="ml-3">
          <div className={styles.CommentHeader}>
            <span className={styles.CommentOwner}>{owner}</span>
            <span className={styles.CommentDate}>{updated_at}</span>
          </div>
          {showEditForm ? (
            <CommentEditForm
            id={id}
            profile_id={profile_id}
            content={content}
            profileImage={profile_image}
            setComments={setComments}
            setShowEditForm={setShowEditForm}
          />
          ) : (
            <p className={styles.CommentContent}>{content}</p>
          )}
          <div>
          {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own comment!</Tooltip>}
              >
                <i className={`fa-regular fa-heart mr-1 ${postStyles.Heart}`}></i>
              </OverlayTrigger>
            ) : comment_like_id ? (
              <span onClick={handleUnlike}>
                <i className={`fa-solid fa-heart ${postStyles.Heart}`}></i>
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <i className={`fa-regular fa-heart mr-1 ${postStyles.Heart}`}></i>
              </span>
            ) : (
              <Link to="/signin">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Please log in to like comments!</Tooltip>}
              >
                <i className={`fa-regular fa-heart mr-1 ${postStyles.Heart}`}></i>
              </OverlayTrigger>
              </Link>
            )}
            {comment_likes_count}
          </div>
        </Media.Body>
        {(is_owner || is_admin) && !showEditForm && (
          <DropdownOptions
            isAdmin={is_admin}
            handleEdit={() => setShowEditForm(true)}
            handleDelete={() => setShowDeleteModal(true)}
          />
        )}
      </Media>
    </div>
    <ConfirmationModal
    show={showDeleteModal}
    handleClose={() => setShowDeleteModal(false)}
    handleConfirm={handleDelete}
    title="Confirm Deletion"
    message="Are you sure you want to delete this comment?"
    optionalMessage="This cannot be undone!"
  />
  </>
  );
};

export default Comment;
