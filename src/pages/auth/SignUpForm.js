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
import postStyles from "../../styles/Post.module.css";

/**
 * SignUpForm component for user registration.
 * 
 * This component provides a sign-up form for new users to create an account. It manages the state of the sign-up form,
 * handles form submission, and displays error messages if any are returned from the server. Upon successful sign-up,
 * it redirects the user to the sign-in page and shows a success alert.
 */
const SignUpForm = () => {
  // Redirects if the user is already logged in
  useRedirect('loggedIn');

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { setAlert } = useSuccessAlert();

  /**
   * Handles input changes in the sign-up form.
   * 
   * @param {Object} event - The change event from the form input.
   */
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Handles form submission for signing up.
   * 
   * Sends sign-up data to the server and processes the response. If the sign-up is successful,
   * it redirects to the sign-in page and shows a success alert. If there are errors, they are set in the component state.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
      setAlert({ message: "Welcome on board!" });
    } catch (err) {
      // Set errors from server response
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
          {/* Display Sign Up Form */}
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
            {/* Display username errors */}
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
            {/* Display password1 errors */}
            {errors.password1?.map((message, idx) => (
              <Alert className={`${postStyles.ErrorAlert} mt-2`} key={idx}>
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
            {/* Display password2 errors */}
            {errors.password2?.map((message, idx) => (
              <Alert className={`${postStyles.ErrorAlert} mt-2`} key={idx}>
                {message}
              </Alert>
            ))}

            <Button className={`${btnStyles.Button} ${btnStyles.Width}`} type="submit">
              Sign <span>Up</span>
            </Button>
            {/* Display non-field errors */}
            {errors.non_field_errors?.map((message, idx) => (
              <Alert className={`${postStyles.ErrorAlert} mt-2`} key={idx}>
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
