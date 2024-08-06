import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import NoResults from "../../assets/no-results.jpg"
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Asset from "../../components/Asset";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false)
  const {pathname} = useLocation()

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const {data} = await axiosReq.get(`/posts/?${filter}`)
            setPosts(data)
            setLoaded(true)
        } catch(err){
            console.log(err)
        }
    }

    setLoaded(false)
    fetchPosts()
  }, [filter, pathname])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular Profiles</p>
        <p>Profiles With The Most Posts</p>
        {loaded ? (
            <>
            {posts.results.length? (
                posts.results.map(post => (
                    <Post key={post.id} {...post} setPosts={setPosts} />
                ))
            ): (
                <Container className={styles.noResults}>
                    <Asset height={200} width={200} src={NoResults} message={message} />
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
