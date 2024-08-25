import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import NoResults from "../../assets/no-results.jpg";
import styles from "../../styles/PostsPage.module.css";
import postStyles from "../../styles/Post.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfilesMostPosts from "../profiles/PopularProfilesMostPosts";
import PopularPosts from "./PopularPosts";
import ScrollToTop from "react-scroll-to-top";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] }); // State for posts data
  const [loaded, setLoaded] = useState(false); // State to track if data is loaded
  const { pathname } = useLocation(); // Hook to get the current path
  const [error, setError] = useState(null); // State for error messages
  const [query, setQuery] = useState(""); // State for search query
  const currentUser = useCurrentUser(); // Hook to get current user data

  /**
   * Fetch posts based on the filter and query.
   * - Set loading state to false initially.
   * - Set a timer to simulate a delay before fetching data.
   * - Handle errors and set the error state if necessary.
   */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setLoaded(true);
      } catch (err) {
        // console.log(err)
        setError("Sorry, an error occurred. Please try again.");
      }
    };

    setLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  /**
   * Clear error message after 3 seconds.
   */
  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          {/* Display popular profiles on mobile */}
          <PopularProfilesMostPosts mobile />
          
          {/* Display error alert if there is an error */}
          {error && (
            <Alert className={`mt-2 text-center ${postStyles.Alert} ${postStyles.ErrorAlert}`}>
              {error}
            </Alert>
          )}

          {/* Search bar for filtering posts */}
          <div className={`mb-3 p-1 ${styles.SearchBar}`}>
            <i className={`fas fa-search ${styles.SearchIcon}`}></i>
            <Form onSubmit={(event) => event.preventDefault()}>
              <Form.Control
                type="text"
                placeholder="Search for posts"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </Form>
          </div>

          {/* Display posts or a "No Results" message */}
          {loaded ? (
            <>
              {posts.results.length ? (
                <InfiniteScroll 
                  children={
                    posts.results.map((post) => (
                      <Post key={post.id} {...post} setPosts={setPosts} />
                    ))
                  }
                  dataLength={posts.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!posts.next}
                  next={() => fetchMoreData(posts, setPosts)}
                />
              ) : (
                <Container className={styles.noResults}>
                  <Asset
                    height={200}
                    width={200}
                    src={NoResults}
                    message={message}
                    borderRadius="10px"
                  />
                </Container>
              )}
            </>
          ) : (
            <Container>
              <Asset spinner />
            </Container>
          )}
        </Col>

        <Col lg={4} className="d-none d-lg-flex flex-column p-0 p-lg-2">
          {/* Display popular profiles and posts on larger screens */}
          <div className="d-lg-none mb-3">
            <PopularProfilesMostPosts />
          </div>
          <div className="d-none d-lg-flex flex-column">
            <PopularProfilesMostPosts />
            <PopularPosts setPosts={setPosts} />
          </div>
        </Col>
      </Row>

      {/* Scroll to top button */}
      <ScrollToTop className={styles.ScrollToTop} color="purple" smooth />
    </>
  );
}

export default PostsPage;
