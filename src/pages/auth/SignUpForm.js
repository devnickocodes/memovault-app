import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import feature_image from '../../assets/feature_image.jpg'
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className= "p-4">
          <h1 className={styles.Header}>Sign <span>up</span></h1>
        </Container>
        <Container className={`mt-3 ${styles.Content}`}>
          <Link className={styles.SignInLink} to="/signin">
            Already have an account? Sign <span>in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className="my-auto d-none d-md-block p-2"
      >
        <Image
          className={`${styles.FeatureImage}`}
          src={feature_image}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;