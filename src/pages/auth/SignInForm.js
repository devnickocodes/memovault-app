import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import featureImage from '../../assets/feature_image.jpg';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/SignInUpForm.module.css';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import { setTokenTimestamp } from '../../utils/utils';
import { useSuccessAlert } from '../../contexts/SuccessAlertContext';
import postStyles from '../../styles/Post.module.css';

/**
 * SignInForm component for user authentication.
 *
 * This component provides a sign-in form for users to log in to their account.
 * It manages the state of the sign-in form, handles form submission, and displays error messages
 * if any are returned from the server. Upon successful sign-in, it sets the current
 * user and redirects to the previous page while showing a success alert.
 */
const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  const { setAlert } = useSuccessAlert();

  // Redirects if the user is already logged in
  useRedirect('loggedIn');

  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const { username, password } = signInData;
  const history = useHistory();

  /**
   * Handles input changes in the sign-in form.
   */
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Handles form submission for signing in.
   *
   * Sends sign-in data to the server and processes the response. If the sign-in is successful,
   * it sets the current user, updates the token timestamp, redirects to the previous page,
   * and shows a success alert. If there are errors, they are set in the component state.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('/dj-rest-auth/login/', signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
      setAlert({ message: 'You have successfully signed in!' });
    } catch (err) {
      // console.log(err)
      // Set errors from server response
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className="p-4">
          <h1 className={`mb-5 ${styles.Header}`}>
            Sign
            {' '}
            <span>in</span>
          </h1>
          {/* Display Sign In Form */}
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

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Display password errors */}
            {errors.password?.map((message, idx) => (
              <Alert className={`${postStyles.ErrorAlert} mt-2`} key={idx}>
                {message}
              </Alert>
            ))}

            <Button className={`${btnStyles.Button} ${btnStyles.Width}`} type="submit">
              Sign
              {' '}
              <span>In</span>
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
          <Link className={styles.SignInLink} to="/signup">
            Don't have an account? Sign
            {' '}
            <span>up</span>
            {' '}
            here!
          </Link>
        </Container>
      </Col>
      <Col md={6} className="my-auto d-none d-md-block p-2">
        <Image className={styles.FeatureImage} src={featureImage} />
      </Col>
    </Row>
  );
};

export default SignInForm;
