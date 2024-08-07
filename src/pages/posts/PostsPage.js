import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import NoResults from "../../assets/no-results.jpg";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Asset from "../../components/Asset";
import { Alert } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const { pathname } = useLocation();
  const [errors, setErrors] = useState();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setLoaded(true);
      } catch (err) {
        setErrors("Sorry, an error occured. Please try again.");
      }
    };

    setLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular Profiles</p>
        <p>Profiles With The Most Posts</p>
        {errors && (
          <Alert className="mt-2 text-center" variant="warning">
            {errors}
          </Alert>
        )}
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
      <Col lg={4} className="d-flex flex-column p-0 p-lg-2">
        <div className="d-flex flex-column">
          <div className="mb-3">Popular profiles for desktop</div>
          <div>Most Active profiles for desktop</div>
        </div>
      </Col>
    </Row>
  );
}

export default PostsPage;
