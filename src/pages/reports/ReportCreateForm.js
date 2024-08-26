import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Button.module.css";
import postStyles from "../../styles/Post.module.css";
import { useSuccessAlert } from "../../contexts/SuccessAlertContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/**
 * ReportCreateForm allows users to create a report on a specific post.
 * The form captures the reason for the report and any custom reason if applicable.
 * It handles form submission, error states, and redirects the user after successful submission.
 */
const ReportCreateForm = () => {
  // State to hold the data of the report being created
  const [reportData, setReportData] = useState({
    reason: "",
    custom_reason: "",
  });


  const { reason, custom_reason } = reportData;

  // State to manage any errors
  const [errors, setErrors] = useState(null);

  // State to hold the post data
  const [post, setPost] = useState({ results: [] });

  // React Router hooks for navigation and accessing URL parameters
  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser()

  // Context to manage success alerts
  const { setAlert } = useSuccessAlert();

  // Redirect users who are not logged in
  useRedirect("loggedOut");

 
  const { owner, image, title, content } = post;

 /**
   * Handles changes to the form input field.
   */
  const handleChange = (event) => {
    setReportData({
      ...reportData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Fetch the post data on component mount using the post ID from the URL.
   * If the post is not found, redirect to a 404 page.
   */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get(`/posts/${id}/`);
        setPost(data);
        // Redirect if the current user is the owner of the post
        if (data.owner === currentUser?.username) {
          history.push("/");
        }
      } catch (err) {
        if (err.response?.status === 404) {
          history.push("/not-found");
        }
      }
    };

    handleMount();
  }, [id, history, currentUser]);

  /**
   * handleSubmit sends the report data to the server when the form is submitted.
   * It also handles any errors and redirects to the report detail page on success.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/reports/", {
        post: id,
        ...reportData,
        custom_reason: reason === "other" ? custom_reason : "",
      });
      history.push(`/reports/${data.id}`);
      setAlert({ message: "Report has been submitted!" });
    } catch (err) {
      // console.log(err)
      // Handle errors
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  /**
   * Clears the error messages after 3 seconds.
   */
  useEffect(() => {
    let timer;
    if (errors) {
      timer = setTimeout(() => setErrors(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [errors]);

  return (
    <Container>
      {/* Display the post details at the top of the form */}
      {post && (
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col
                xs={12}
                md={3}
                className="mb-3"
              >
                <Asset src={image} alt="Post Image" height="200" width="200" />
              </Col>
              <Col
                xs={12}
                md={9}
              >
                <Card.Title>
                  <span className={postStyles.Font}>Title:</span> {title}
                </Card.Title>
                <Card.Subtitle className="mb-2">
                  <span className={postStyles.Font}>Posted by:</span> {owner}
                </Card.Subtitle>
                <Card.Text>
                  <span className={postStyles.Font}>Content:</span> {content}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* The form for creating a report */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="reportReason">
          <Form.Label>Reason for Report</Form.Label>
          <Form.Control
            as="select"
            name="reason"
            value={reason}
            onChange={handleChange}
          >
            {/* Select options for predefined report reasons */}
            <option value="">Select a reason</option>
            <option value="spam">Spam</option>
            <option value="inappropriate">Inappropriate Content</option>
            <option value="harassment">Harassment</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        {/* Display errors related to the 'reason' field */}
        {errors?.reason?.map((message, idx) => (
          <Alert className={postStyles.ErrorAlert} key={idx}>
            {message}
          </Alert>
        ))}

        {/* Conditionally render a custom reason field if 'Other' is selected */}
        {reason === "other" && (
          <Form.Group controlId="customReason">
            <Form.Label>Custom Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="custom_reason"
              value={custom_reason}
              onChange={handleChange}
            />
          </Form.Group>
        )}

        {/* Display errors related to the 'custom_reason' field */}
        {errors?.custom_reason?.map((message, idx) => (
          <Alert className={postStyles.ErrorAlert} key={idx}>
            {message}
          </Alert>
        ))}

        {/* Display any non-field errors (general errors) */}
        {errors?.non_field_errors?.map((message, idx) => (
          <Alert className={postStyles.ErrorAlert} key={idx}>
            {message}
          </Alert>
        ))}

        {/* Submit button for the report form */}
        <Button type="submit" className={`mt-3 ${btnStyles.Button}`}>
          Submit Report
        </Button>
      </Form>
    </Container>
  );
};

export default ReportCreateForm;
