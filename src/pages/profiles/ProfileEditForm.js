import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import postCreateStyles from "../../styles/PostCreateEditForm.module.css";
import navBarStyles from "../../styles/NavBar.module.css";
import postStyles from "../../styles/Post.module.css"

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    hobbies: "",
    image: "",
  });
  const { name, bio, hobbies, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, bio, hobbies, image } = data;
          setProfileData({ name, bio, hobbies, image });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("hobbies", hobbies);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
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

  const textFields = (
    <>
      <Form.Group controlId="name" className="mt-3 text-center">
        <Form.Label className={`mb-2 ${postCreateStyles.inputLabels}`}>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="hobbies" className="mt-3 text-center">
        <Form.Label className={`mb-2 ${postCreateStyles.inputLabels}`}>Hobbies</Form.Label>
        <Form.Control
          type="text"
          name="hobbies"
          value={hobbies}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="bio" className="mt-3 text-center">
        <Form.Label className={`mb-2 ${postCreateStyles.inputLabels}`}>Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="bio"
          value={bio}
          onChange={handleChange}
        />
      </Form.Group>

      <Row className="w-100 justify-content-center mt-3">
        <Col xs={12} md={8} lg={6} className="d-flex justify-content-center m-2">
          <Button
            className={`${btnStyles.GreyButton} ${btnStyles.Button} mr-2`}
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
          <Button className={btnStyles.Button} type="submit">
            Save
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Container className="d-flex flex-column align-items-center">
        <Form.Label className={`${navBarStyles.Logo} mb-4`}>Edit <span>Profile</span></Form.Label>
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6} className="text-center">
            <Form.Group>
              {image && (
                <figure>
                  <Image className={appStyles.Image} src={image} fluid />
                </figure>
              )}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
              className={postCreateStyles.hiddenFileInput}
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert className={postStyles.ErrorAlert} key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Col>
        </Row>
        <Row className="w-100 justify-content-center">
          <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
            <Container>{textFields}</Container>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default ProfileEditForm;
