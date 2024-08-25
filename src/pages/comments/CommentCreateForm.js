import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/CommentCreateEditForm.module.css";
import postStyles from "../../styles/Post.module.css";
import { useSuccessAlert } from "../../contexts/SuccessAlertContext";

/**
 * CommentCreateForm component allows users to create and submit comments for a post.
 * It includes form validation, error handling, and user feedback through alerts.
 */
function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  // State to hold the content of the comment
  const [content, setContent] = useState("");
  // State to hold any error messages
  const [error, setError] = useState(null); 

  // Hook for success alerts
  const { setAlert } = useSuccessAlert();

  /**
   * Handles changes to the comment input field.
   */
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  /**
   * Handles form submission to post a new comment.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Post the new comment to the server
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });

      // Update the comments state with the new comment
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));

      // Update the post state with the new comments count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));

      // Clear the input field and show a success alert
      setContent("");
      setAlert({ message: "Thank you for commenting!" });
    } catch (err) {
      // Handle any errors that occur during the comment posting
      // console.log(err)
      setError("Sorry an error occurred, please try again.");
    }
  };

  /**
   * Effect to handle the display of error messages.
   * Clears the error message after 2 seconds.
   */
  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 2000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Form className={`${styles.CommentForm} mt-2 mb-3`} onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup className={styles.InputGroup}>
          {/* Link to the user's profile with the avatar image */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} className={styles.Avatar} />
          </Link>
          {/* Comment input field */}
          <Form.Control
            placeholder="Write a comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
            className={`${styles.TextArea} ml-3`}
          />
        </InputGroup>
      </Form.Group>
      {/* Submit button */}
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()} // Disable button if input is empty or whitespace
        type="submit"
      >
        Comment
      </button>
      {/* Display error messages */}
      {error && <Alert className={`mt-2 ${postStyles.Alert} ${postStyles.ErrorAlert}`}>{error}</Alert>}
    </Form>
  );
}

export default CommentCreateForm;
