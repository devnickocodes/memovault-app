import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import styles from "../../styles/PostCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { useHistory, useParams } from "react-router-dom";
import postStyles from "../../styles/Post.module.css";
import { useSuccessAlert } from "../../contexts/SuccessAlertContext";

function PostEditForm() {
  // State to hold form errors
  const [errors, setErrors] = useState({});
  
  // Redirect the user if logged out
  useRedirect('loggedOut');
  
  // State to hold form data
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const { title, content, image } = postData;

  // Ref for the file input
  const inputImage = useRef(null);

  // Hook for navigation
  const history = useHistory();
  // Extract post ID from URL parameters
  const { id } = useParams();

  // Hook to manage success alerts
  const { setAlert } = useSuccessAlert();

  /**
   * Fetch post data when component mounts:
   * - Retrieve post data based on the ID from URL params
   * - Set post data if the current user is the owner
   * - Redirect to home page if not the owner
   */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, content, image, is_owner } = data;
        is_owner ? setPostData({ title, content, image }) : history.push('/');
      } catch (err) {
        if (err.response?.status !== 401) {
          history.push('/not-found');
        }
      }
    };

    handleMount();
  }, [history, id]);

  // Handle form input changes
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Handle form submission:
   * - Create FormData object to send as multipart/form-data
   * - Append title, content, and image to FormData
   * - Make API request to update the post
   * - Redirect to the updated post's detail page
   * - Show success alert or handle errors
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    if (inputImage?.current?.files[0]) {
      formData.append('image', inputImage.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
      setAlert({ message: "Post has been updated!" });
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  /**
   * Handle image file input change:
   * - Revoke the old image URL if it exists
   * - Create and set a new URL for the selected image
   */
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container
        className={`${styles.Container} d-flex flex-column align-items-center`}
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6} className="text-center">
            <Form.Group className="text-center">
              {/* Display the current image with option to change it */}
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                className={styles.hiddenFileInput}
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={inputImage}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              // Display image upload errors, if any
              <Alert className={postStyles.ErrorAlert} key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="title" className="mt-3 text-center">
              <Form.Label className={styles.inputLabels}>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
              // Display title errors, if any
              <Alert className={postStyles.ErrorAlert} key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="content" className="mt-3 text-center">
              <Form.Label className={styles.inputLabels}>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="content"
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
              // Display content errors, if any
              <Alert className={postStyles.ErrorAlert} key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
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
      </Container>
    </Form>
  );
}

export default PostEditForm;
