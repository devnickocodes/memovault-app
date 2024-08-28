import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { useParams, useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ScrollToTop from 'react-scroll-to-top';
import { axiosReq } from '../../api/axiosDefaults';
import Post from './Post';
import styles from '../../styles/Post.module.css';
import postsPageStyles from '../../styles/PostsPage.module.css';
import CommentCreateForm from '../comments/CommentCreateForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Comment from '../comments/Comment';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';
import PopularPosts from './PopularPosts';
import PopularProfilesMostPosts from '../profiles/PopularProfilesMostPosts';
import navbarStyles from '../../styles/NavBar.module.css';

function PostPage() {
  const { id } = useParams(); // Extract post ID from URL parameters
  const [post, setPost] = useState({ results: [] }); // State for post data
  const [error, setError] = useState(null); // State for error messages
  const currentUser = useCurrentUser(); // Hook to retrieve the current user's data
  const profile_image = currentUser?.profile_image; // Get the current user's profile image
  const [comments, setComments] = useState({ results: [] }); // State for comments data

  const history = useHistory(); // Hook for navigation

  /**
   * Fetch post and comments when component mounts:
   * - Retrieve post data and comments for the specified post ID
   * - Set post and comments state with retrieved data
   * - Redirect to 'not-found' page on 404 error or show a generic error message for other errors
   */
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
        // Redirect to 'not-found' page if status is 404
        if (err.response?.status === 404) {
          history.push('/not-found');
        } else {
          // Set a generic error message for other errors
          setError('Sorry, an error occurred. Please try again.');
        }
      }
    };
    handleMount();
  }, [id, history]);

  /**
   * Clear error message after 3 seconds
   */
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
        {/* Display popular profiles on mobile */}
        <PopularProfilesMostPosts mobile />

        {/* Display error alert if there is an error */}
        {error && (
          <Alert
            className={`mt-2 text-center ${styles.Alert} ${styles.ErrorAlert}`}
          >
            {error}
          </Alert>
        )}

        {/* Display post component with post details */}
        <Post {...post.results[0]} setPosts={setPost} postPage />

        <Container className="mt-3">
          {/* Display comment creation form if user is logged in */}
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : null}

          {/* Display comments with infinite scrolling */}
          {comments.results.length ? (
            <>
              <p className={`${navbarStyles.Logo} mb-4`}><span>Comments</span></p>
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
            </>
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
        {/* Display popular profiles and posts on larger screens */}
        <div className="d-lg-none mb-3">
          <PopularProfilesMostPosts />
        </div>
        <div className="d-none d-lg-flex flex-column">
          <PopularProfilesMostPosts />
          <PopularPosts />
        </div>
      </Col>

      {/* Scroll to top button */}
      <ScrollToTop className={postsPageStyles.ScrollToTop} color="purple" smooth />
    </Row>
  );
}

export default PostPage;
