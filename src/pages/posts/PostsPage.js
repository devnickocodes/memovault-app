import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";

function PostsPage() {
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular Profiles</p>
        <p>Profiles With The Most Posts</p>
        <p>List of posts here</p>
      </Col>
      <Col lg={4} className="d-flex flex-column p-0 p-lg-2">
        <div className="d-flex flex-column">
          <div className="mb-3">
          Popular profiles for desktop
          </div>
          <div>
          Most Active profiles for desktop
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default PostsPage;