import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import styles from "../../styles/Post.module.css";
import postsPageStyles from "../../styles/PostsPage.module.css";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import commentStyles from "../../styles/Comment.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularPosts from "./PopularPosts";
import PopularProfilesMostPosts from "../profiles/PopularProfilesMostPosts";
import ScrollToTop from "react-scroll-to-top";


function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  const history = useHistory()

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}/`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        // console.log(err)
        if (err.response?.status === 404) {
          history.push("/not-found");
        } else {
          setError("Sorry, an error occurred. Please try again.");
        }
      }
    };
    handleMount();
  }, [id, history]);

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Row className="h-100">
      <Col lg={8} className="py-2 p-0 p-lg-2">
      <PopularProfilesMostPosts mobile />
        {error && (
          <Alert
            className={`mt-2 text-center ${styles.Alert} ${styles.ErrorAlert}`}
          >
            {error}
          </Alert>
        )}
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className="mt-3">
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            <p className={`${commentStyles.CommentsHeading} mb-3`}>Comments</p>
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  setComments={setComments}
                  setPost={setPost}
                  key={comment.id}
                  {...comment}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <p className="text-muted">
              It would be great if you were the first to comment!
            </p>
          ) : (
            <p className="text-muted">
              No comments yet. Be the first to comment!
            </p>
          )}
        </Container>
      </Col>

      <Col lg={4} className="d-none d-lg-flex flex-column p-lg-2">
        <div className="d-lg-none mb-3">
          <PopularProfilesMostPosts />
        </div>
        <div className="d-none d-lg-flex flex-column">
          <PopularProfilesMostPosts />
          <PopularPosts />
        </div> 
      </Col>
    <ScrollToTop className={postsPageStyles.ScrollToTop} color="purple" smooth />
    </Row>
  );
}

export default PostPage;
