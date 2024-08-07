import React from "react";
import { Link } from "react-router-dom";
import Media from "react-bootstrap/Media";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DropdownOptions } from "../../components/DropdownOptions";
import { axiosRes } from "../../api/axiosDefaults";

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

  const handleDelete = async () => {
    try{
        await axiosRes.delete(`/comments/${id}/`)
        setPost(prevPost => ({
            results: [{
                ...prevPost.results[0],
                comments_count: prevPost.results[0].comments_count - 1
            }]
        }))

        setComments(prevComment => ({
            ...prevComment,
            results: prevComment.results.filter(comment => comment.id !== id)
        }))
    } catch(err) {
        console.log(err)
    }
  }

  return (
    <div className={`${styles.CommentContainer} p-3 mb-3`}>
      <Media className="align-items-start">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="ml-3">
          <div className={styles.CommentHeader}>
            <span className={styles.CommentOwner}>{owner}</span>
            <span className={styles.CommentDate}>{updated_at}</span>
          </div>
          <p className={styles.CommentContent}>{content}</p>
        </Media.Body>
        {(is_owner || is_admin) && (
          <DropdownOptions
            isAdmin={is_admin}
            handleEdit={() => {}}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </div>
  );
};

export default Comment;
