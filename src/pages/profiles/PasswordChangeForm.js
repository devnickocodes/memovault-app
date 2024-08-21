import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import navBarStyles from "../../styles/NavBar.module.css"
import postStyles from "../../styles/Post.module.css"


const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      // console.log(err)
      setErrors(err.response?.data);
    }
  };

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
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Label className={`${navBarStyles.Logo} mb-4`}>New <span>Password</span></Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} className={postStyles.ErrorAlert}>
                {message}
              </Alert>
            ))}
            <Form.Group>
            <Form.Label className={`${navBarStyles.Logo} mb-4`}>Confirm <span>Password</span></Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} className={postStyles.ErrorAlert}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.GreyButton} mr-2`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button
              type="submit"
              className={btnStyles.Button}
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;