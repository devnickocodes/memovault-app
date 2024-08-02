import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import feature_image from "../../assets/feature_image.jpg";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const SignInForm = () => {

  const setCurrentUser = useSetCurrentUser()

    const [signInData, setSignInData] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({});

    const {username, password} = signInData;

    const history = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const {data} = await axios.post("/dj-rest-auth/login/", signInData);
            setCurrentUser(data.user)
            history.push('/')
        } catch (err) {
            setErrors(err.response?.data)
        }
      }

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className="p-4">
          <h1 className={`mb-5 ${styles.Header}`}>
            Sign <span>in</span>
          </h1>

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
            {errors.username?.map((message, idx) => 
            <Alert className="mt-2" key={idx} variant="warning">
            {message}
            </Alert>
            )}


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
            {errors.password?.map((message, idx) => 
            <Alert className="mt-2" key={idx} variant="warning">
            {message}
            </Alert>
            )}
 

            <Button className={btnStyles.Button} type="submit">
              Sign <span>In</span>
            </Button>
            {errors.non_field_errors?.map((message, idx) => 
            <Alert className="mt-2" key={idx} variant="warning">
            {message}
            </Alert>
            )}

          </Form>
        </Container>
        <Container className={`mt-3 ${styles.Content}`}>
          <Link className={styles.SignInLink} to="/signup">
            Don't have an account? Sign <span>up</span> here!
          </Link>
        </Container>
      </Col>
      <Col md={6} className="my-auto d-none d-md-block p-2">
        <Image className={styles.FeatureImage} src={feature_image} />
      </Col>
    </Row>
  );
};

export default SignInForm;
