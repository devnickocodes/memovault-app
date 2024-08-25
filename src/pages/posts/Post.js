import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Alert from "react-bootstrap/Alert";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Post.module.css";
import { DropdownOptions } from "../../components/DropdownOptions";
import { scrollToTop } from "../../utils/scrollToTop";
import ConfirmationModal from "../../utils/ConfirmationModal";
import { likePost, unlikePost } from "../../utils/LikeUnlikePostsActions";
import { useSuccessAlert } from "../../contexts/SuccessAlertContext";

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

  // Get the current user from context
  const currentUser = useCurrentUser();

  // State to manage error messages
  const [error, setError] = useState(null);

  // State to manage whether the delete confirmation modal is shown
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Hook for navigation
  const history = useHistory();

  // Hook to manage success alerts
  const { setAlert } = useSuccessAlert();

  /**
   * Navigate to the edit page for the post.
   */
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  /**
   * Handle post deletion.
   * - Sends a delete request to the server.
   * - Updates the alert context with a success message.
   * - Navigates back to the previous page.
   * - Closes the delete confirmation modal.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
      setAlert({ message: "Post has been deleted!" });
    } catch (err) {
      setError("Failed to delete the post. Please try again in a moment.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  /**
   * Handle liking the post.
   * - Sends a like request to the server.
   * - Updates the alert context with a success message.
   */
  const handleLike = async () => {
    try {
      await likePost(id, setPosts);
      setAlert({ message: "Post has been liked!" });
    } catch (err) {
      setError("Failed to like the post. Please try again.");
    }
  };

  /**
   * Handle unliking the post.
   * - Sends an unlike request to the server.
   * - Updates the alert context with a success message.
   */
  const handleUnlike = async () => {
    try {
      await unlikePost(post_like_id, id, setPosts);
      setAlert({ message: "Post has been unliked!" });
    } catch (err) {
      setError("Failed to unlike the post. Please try again.");
    }
  };

  // Effect to clear the error message after 3 seconds
  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);


  
  // Scroll to the top of the page smoothly.
  const handleScroll = () => scrollToTop();

  return (
    <>
      {/* Card component for displaying the post */}
      <Card className={`mb-4 ${styles.Container} m-3`}>
        <Card.Header className={`p-2 ${styles.CardHeader}`}>
          <Media className="d-flex justify-content-between align-items-center">
            {/* Link to the profile of the post owner */}
            <Link
              to={`/profiles/${profile_id}`}
              className={`d-flex align-items-center text-decoration-none ${styles.avatarImage}`}
            >
              <Avatar src={profile_image} />
              <span>{owner}</span>
            </Link>
            {/* Display post update time and options for editing/deleting */}
            <div className="d-flex align-items-center">
              <span>{updated_at}</span>
              {postPage && (is_owner || is_admin) && (
                // Show edit and delete options if the user is the owner or admin, and on the post page
                <DropdownOptions
                  isAdmin={is_admin}
                  handleEdit={handleEdit}
                  handleDelete={() => setShowDeleteModal(true)}
                />
              )}
            </div>
          </Media>
        </Card.Header>

        {/* Link to the detailed view of the post */}
        <Link to={`/posts/${id}`}>
          <Card.Img
            variant="top"
            src={image}
            alt={title}
            className={styles.CardImg}
            onClick={handleScroll}
          />
        </Link>

        <Card.Body className={`text-center ${styles.CardBody}`}>
          {title && (
            <Card.Title className={styles.CardTitle}>{title}</Card.Title>
          )}
          {content && (
            <Card.Text className={styles.CardText}>{content}</Card.Text>
          )}
        </Card.Body>

        {/* Card Footer with interaction options */}
        <div className={`text-center ${styles.CardBody}`}>
          {is_owner ? (
            // Display a non-clickable heart icon if the user is the owner
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className={`fa-regular fa-heart mr-1 ${styles.Heart}`}></i>
            </OverlayTrigger>
          ) : post_like_id ? (
            // Show clickable heart icon to unlike if the user has already liked the post
            <span onClick={handleUnlike}>
              <i className={`fa-solid fa-heart ${styles.Heart}`}></i>
            </span>
          ) : currentUser ? (
            // Show clickable heart icon to like if the user is logged in but has not liked the post
            <span onClick={handleLike}>
              <i className={`fa-regular fa-heart mr-1 ${styles.Heart}`}></i>
            </span>
          ) : (
            // Show a link to login page with a tooltip for non-logged-in users
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Please log in to like posts!</Tooltip>}
            >
              <Link to={"/signin"}>
              <i className={`fa-regular fa-heart mr-1 ${styles.Heart}`}></i>
              </Link>
            </OverlayTrigger>
          )}
          {post_likes_count}

          {/* Link to comments section */}
          <Link to={`/posts/${id}`}>
            <i
              className={`fa-regular fa-comment ml-2 mr-2 ${styles.Comment}`}
            ></i>
          </Link>
          {comments_count}

          {/* Report button */}
          {!is_owner && (
            currentUser ? (
              // Show report button if the user is logged in and not the owner
              <Link to={`/reports/create/${id}`}>
                <i className={`fa-solid fa-flag ml-2 mr-2 ${styles.Flag}`}></i>
              </Link>
            ) : (
              // Show a link to login page with a tooltip for non-logged-in users
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Please log in to report posts!</Tooltip>}
              >
                <Link to={"/signin"}>
                  <i className={`fa-solid fa-flag ml-2 mr-2 ${styles.Flag}`}></i>
                </Link>
              </OverlayTrigger>
            )
          )}

          {/* Display error message if there is an error */}
          {error && (
            <Alert className={`mt-2 text-center ${styles.Alert} ${styles.ErrorAlert}`}>
              {error}
            </Alert>
          )}
        </div>
      </Card>

      {/* Confirmation modal for post deletion */}
      <ConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this post?"
        optionalMessage="This cannot be undone!"
      />
    </>
  );
};

export default Post;
