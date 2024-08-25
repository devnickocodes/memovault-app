import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/CommentCreateEditForm.module.css";
import postStyles from "../../styles/Post.module.css";
import { useSuccessAlert } from "../../contexts/SuccessAlertContext";

/**
 * CommentEditForm component provides a form to edit an existing comment.
 * It allows users to update the content of the comment and handle errors.
 */
function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  // State to manage the content of the form
  const [formContent, setFormContent] = useState(content);

  // State to handle error messages
  const [error, setError] = useState(null);

  // Hook for success alerts
  const { setAlert } = useSuccessAlert();

  /**
   * Handles changes to the form input field.
   */
  const handleChange = (event) => {
    // Update the formContent state with the new value
    setFormContent(event.target.value); 
  };

  /**
   * Handles form submission to update the comment.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send the updated comment content to the server
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });

      // Update the comments state with the edited comment
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(), // Update comment content
                updated_at: "now", // Update the timestamp (placeholder value for this example)
              }
            : comment;
        }),
      }));

      // Hide the edit form and show a success alert
      setShowEditForm(false);
      setAlert({ message: "Comment updated!" });
    } catch (err) {
      // Handle any errors that occur during the comment update
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
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        {/* Textarea for editing comment content */}
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        {/* Cancel button to exit the edit form */}
        <button
          className={`m-2 ${styles.GreyButton}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        {/* Save button to submit the edited comment */}
        <button
          className={styles.Button}
          disabled={!formContent.trim()} // Disable button if form content is empty or whitespace
          type="submit"
        >
          save
        </button>
      </div>
      {/* Display error messages */}
      { error && <Alert className={`${postStyles.Alert} ${postStyles.ErrorAlert}`}>{error}</Alert>}
    </Form>
  );
}

export default CommentEditForm;
