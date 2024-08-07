import React, { useState } from "react";
import { Link } from "react-router-dom";
import Media from "react-bootstrap/Media";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { DropdownOptions } from "../../components/DropdownOptions";
import { axiosRes } from "../../api/axiosDefaults";
import { Alert } from "react-bootstrap";
import alertStyles from "../../styles/Post.module.css";
import CommentEditForm from "./CommentEditForm";

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
  } = props;

  const [errors, setErrors] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

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
      setErrors("Sorry, there was an error trying to delete the comment. Please try again.");
    }
  };

  return (
    <div className={`${styles.CommentContainer} p-3 mb-3`}>
      {errors && (
        <Alert className={`mt-2 text-center ${alertStyles.Alert}`}>
          {errors}
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
        </Media.Body>
        {(is_owner || is_admin) && !showEditForm && (
          <DropdownOptions
            isAdmin={is_admin}
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </div>
  );
};

export default Comment;
