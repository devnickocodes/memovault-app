import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import postsPageStyles from "../../styles/PostsPage.module.css"

import PopularProfilesMostPosts from "../profiles/PopularProfilesMostPosts";
import ScrollToTop from "react-scroll-to-top";
import PopularPosts from "../posts/PopularPosts";

const ReportPage = () => {
 
    return (
    <Row className="h-100">
      <Col lg={8} className="py-2 p-0 p-lg-2">
      <PopularProfilesMostPosts mobile />
        <Container className="mt-3">
          <p>report</p>
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


export default ReportPage