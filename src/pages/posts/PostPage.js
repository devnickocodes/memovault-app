import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import { Alert } from "react-bootstrap";
import alertStyles from "../../styles/Post.module.css"

function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState({ results: [] });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const handleMount = async (event) => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}/`),
        ]);
        setPost({ results: [post] });
      } catch (err) {
        setErrors("Sorry, an error occured. Please try again.");
      }
    };
    handleMount();
  }, [id]);

  useEffect(() => {
    let timer;
    if (errors) {
      timer = setTimeout(() => setErrors(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [errors]);
  return (
    <Row className="h-100">
      <Col lg={8} className="py-2 p-0 p-lg-2">
        <p>Popular Profiles</p>
        <p>Profiles With The Most Posts</p>
        {errors && (
          <Alert className={`mt-2 text-center ${alertStyles.Alert}`} variant="warning">
            {errors}
          </Alert>
        )}
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container>Comments</Container>
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

export default PostPage;
