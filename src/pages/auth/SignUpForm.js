import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import feature_image from "../../assets/feature_image.jpg";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";
import { useSuccessAlert } from "../../contexts/SuccessAlertContext";
import postStyles from "../../styles/Post.module.css"


const SignUpForm = () => {

  useRedirect('loggedIn')
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  }); 

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const { alert, setAlert } = useSuccessAlert();


  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
      setAlert({ message: "Welcome on board!" });
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className="p-4">
          <h1 className={`mb-5 ${styles.Header}`}>
            Sign <span>up</span>
          </h1>
          {alert?.message && (
        <Alert className={`${postStyles.Alert} ${postStyles.SuccessAlert}`}>
          {alert.message}
        </Alert>
      )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert className={`${postStyles.ErrorAlert} mt-2`} key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert className={`${postStyles.ErrorAlert} mt-2`} key={idx} >
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert className={`${postStyles.ErrorAlert} mt-2`} key={idx} >
                {message}
              </Alert>
            ))}

            <Button className={`${btnStyles.Button} ${btnStyles.Width}`} type="submit">
              Sign <span>Up</span>
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert className={`${postStyles.ErrorAlert} mt-2`} key={idx} >
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${styles.Content}`}>
          <Link className={styles.SignInLink} to="/signin">
            Already have an account? Sign <span>in</span>
          </Link>
        </Container>
      </Col>
      <Col md={6} className="my-auto d-none d-md-block p-2">
        <Image className={styles.FeatureImage} src={feature_image} />
      </Col>
    </Row>
  );
};

export default SignUpForm;
