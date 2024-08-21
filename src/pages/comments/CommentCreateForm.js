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



function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const [error, setError] = useState(null)

  const { setAlert } = useSuccessAlert();

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
      setAlert({ message: "Thank you for commenting!" });
    } catch (err) {
      // console.log(err)
      setError("Sorry an error occurred, please try again.")
    }
  };

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
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} className={styles.Avatar} />
          </Link>
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
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        Comment
      </button>
      {error && <Alert className={`mt-2 ${postStyles.Alert} ${postStyles.ErrorAlert}`}>{error}</Alert>}
    </Form>
  );
}

export default CommentCreateForm;
