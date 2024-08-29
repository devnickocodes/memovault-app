import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useHistory, useParams } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import btnStyles from '../../styles/Button.module.css';
import navBarStyles from '../../styles/NavBar.module.css';
import postStyles from '../../styles/Post.module.css';
import { useSuccessAlert } from '../../contexts/SuccessAlertContext';

/**
 * UsernameForm allows users to update their username.
 * It verifies that the current user is the same as the one being edited,
 * handles form submission, and manages error and success messages.
 */
const UsernameForm = () => {
  // State to manage the input value for the username
  const [username, setUsername] = useState('');

  // State to manage validation errors from the server
  const [errors, setErrors] = useState({});

  // Hook for navigation
  const history = useHistory();

  // Hook to get the URL parameter
  const { id } = useParams();

  // Hook to get the current user data
  const currentUser = useCurrentUser();

  // Hook to update the current user data
  const setCurrentUser = useSetCurrentUser();

  // Hook to handle success alerts
  const { setAlert } = useSuccessAlert();

  /**
   * Initialize the username field with the current user's username
   * if the user is allowed to edit their own profile. Redirects to home if the
   * user is not authorized to edit the profile.
   */
  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push('/');
    }
  }, [currentUser, history, id]);

  /**
   * Handles form submission by sending a request to update the username.
   * On success, updates the current user context and displays a success alert.
   * On error, updates the errors state with validation messages.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put('/dj-rest-auth/user/', { username });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
      setAlert({ message: 'Username has been updated!' });
    } catch (err) {
      // console.log(err)
      // Set errors from the response data
      setErrors(err.response?.data);
    }
  };

  /**
   * Effect to clear errors after 3 seconds.
   */
  useEffect(() => {
    let timer;
    if (errors) {
      timer = setTimeout(() => setErrors({}), 3000);
    }
    return () => clearTimeout(timer);
  }, [errors]);

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label className={`${navBarStyles.Logo} mb-4`}>
                Change
                {' '}
                <span>Username</span>
              </Form.Label>
              <Form.Control
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {/* Display error messages if there are any */}
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} className={postStyles.ErrorAlert}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.GreyButton} mr-2`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              className={btnStyles.Button}
              type="submit"
            >
              Save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameForm;
