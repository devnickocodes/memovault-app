import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";


function PostPage() {
  const {id} = useParams()

  const [post, setPost] = useState({results:[]})

  useEffect(() => {
    const handleMount = async (event) => {
        try {
            const [{data:post}] = await Promise.all([
                axiosReq.get(`/posts/${id}`)
            ])
            setPost({results:[post]})
            console.log(post)
        } catch(err){
            console.log(err)
        }
    }
    handleMount()
  }, [id])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Most Followed Profiles</p>
        <p>Profiles With The Most Posts</p>
        <p>Post component</p>
        <Container>
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;