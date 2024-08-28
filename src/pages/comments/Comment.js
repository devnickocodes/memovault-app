import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Media from 'react-bootstrap/Media';
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Avatar from '../../components/Avatar';
import { DropdownOptions } from '../../components/DropdownOptions';
import { axiosRes } from '../../api/axiosDefaults';
import CommentEditForm from './CommentEditForm';
import ConfirmationModal from '../../utils/ConfirmationModal';
import styles from '../../styles/Comment.module.css';
import postStyles from '../../styles/Post.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useSuccessAlert } from '../../contexts/SuccessAlertContext';
import { scrollToTop } from '../../utils/scrollToTop';

/**
 * Comment component that displays a single comment.
 *
 * This component allows users to view, like, unlike, edit, and delete comments.
 * It shows the comment content, the author, and the time of the last update.
 * Users can perform actions based on their permissions and the current state of the comment.
 */
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

  // Access current user from context
  const currentUser = useCurrentUser();
  // State to manage errors and form visibility
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Hook for success alerts
  const { setAlert } = useSuccessAlert();

  const handleScroll = () => scrollToTop();

  /**
   * Handles the deletion of the comment.
   *
   * Makes an API call to delete the comment and updates parent components' states.
   * Shows an alert upon successful deletion or an error message if the deletion fails.
   */
  const handleDelete = async () => {
    try {
      // Send delete request
      await axiosRes.delete(`/comments/${id}/`);
      // Update post's comment count
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
      // Show success alert
      setAlert({ message: 'Comment deleted!' });
    } catch (err) {
      // Handle error
      // console.log(err)
      setError('Sorry, there was an error trying to delete the comment. Please try again.');
    } finally {
      // Close modal
      setShowDeleteModal(false);
    }
  };

  /**
   * Handles liking a comment.
   *
   * Sends a like request to the server and updates the state to reflect the like.
   * Shows an alert on success or an error message if the request fails.
   */
  const handleLike = async () => {
    try {
      // Send like request
      const { data } = await axiosRes.post('/like/comment/', { comment: id });
      // Update comments state with the new like
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => (comment.id === id
          ? {
            ...comment,
            comment_likes_count: comment.comment_likes_count + 1,
            comment_like_id: data.id,
          }
          : comment)),
      }));
      // Show success alert
      setAlert({ message: 'You liked the comment!' });
    } catch (err) {
      // Handle error
      // console.log(err)
      setError('Failed to like the comment. Please try again.');
    }
  };

  /**
   * Handles unliking a comment.
   *
   * Sends an unlike request to the server and updates the state to reflect the unlike.
   * Shows an alert on success or an error message if the request fails.
   */
  const handleUnlike = async () => {
    try {
      // Send unlike request
      await axiosRes.delete(`/like/comment/${comment_like_id}`);
      // Update comments state with the removed like
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => (comment.id === id
          ? {
            ...comment,
            comment_likes_count: comment.comment_likes_count - 1,
            comment_like_id: null,
          }
          : comment)),
      }));
      // Show success alert
      setAlert({ message: 'You unliked the comment!' });
    } catch (err) {
      // Handle error
      // console.log(err)
      setError('Failed to unlike the comment. Please try again.');
    }
  };

  // Clear error messages after a timeout
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
        {/* Show error message if there's any */}
        {error && (
          <Alert className={`mt-2 text-center ${postStyles.Alert} ${postStyles.ErrorAlert}`}>
            {error}
          </Alert>
        )}
        <Media className="align-items-start">
          {/* User avatar linked to their profile */}
          <Link onClick={handleScroll} to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <Media.Body className="ml-3">
            <div className={styles.CommentHeader}>
              {/* Display comment owner and update time */}
              <span className={styles.CommentOwner}>{owner}</span>
              <span className={styles.CommentDate}>{updated_at}</span>
            </div>
            {showEditForm ? (
              // Render the edit form if in edit mode
              <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              // Otherwise, display the comment content
              <p className={styles.CommentContent}>{content}</p>
            )}
            <div>
              {/* Handle like/unlike functionality */}
              {is_owner ? (
                // User is the owner of the comment, so they cannot like it
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own comment!</Tooltip>}
                >
                  <i className={`fa-regular fa-heart mr-1 ${postStyles.Heart}`} />
                </OverlayTrigger>
              ) : comment_like_id ? (
                // User has already liked the comment, show unlike option
                <span onClick={handleUnlike}>
                  <i className={`fa-solid fa-heart ${postStyles.Heart}`} />
                </span>
              ) : currentUser ? (
                // User can like the comment
                <span onClick={handleLike}>
                  <i className={`fa-regular fa-heart mr-1 ${postStyles.Heart}`} />
                </span>
              ) : (
                // User is not logged in, prompt them to sign in
                <Link to="/signin">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Please log in to like comments!</Tooltip>}
                  >
                    <i className={`fa-regular fa-heart mr-1 ${postStyles.Heart}`} />
                  </OverlayTrigger>
                </Link>
              )}
              {comment_likes_count}
            </div>
          </Media.Body>
          {/* Show edit and delete options for owners or admins */}
          {(is_owner || is_admin) && !showEditForm && (
            <DropdownOptions
              isAdmin={is_admin}
              handleEdit={() => setShowEditForm(true)}
              handleDelete={() => setShowDeleteModal(true)}
            />
          )}
        </Media>
      </div>
      {/* Confirmation modal for deleting comments */}
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
