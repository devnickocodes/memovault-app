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
import postStyles from "../../styles/Post.module.css"
import { useSuccessAlert } from "../../contexts/SuccessAlertContext";


const ReportCreateForm = () => {
  const [reportData, setReportData] = useState({
    reason: "",
    custom_reason: "",
  });
  const { reason, custom_reason } = reportData;
  const [errors, setErrors] = useState(null);
  const [post, setPost] = useState({ results: [] });
  const history = useHistory();
  const { id } = useParams();
  const { setAlert } = useSuccessAlert();

  useRedirect("loggedOut");

  const { owner, image, title, content } = post;

  const handleChange = (event) => {
    setReportData({
      ...reportData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get(`/posts/${id}/`);
        setPost(data);
      } catch (err) {
        // console.log(err)
        if (err.response?.status === 404) {
          history.push("/not-found");
        }
      }
    };

    handleMount();
  }, [id]);

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
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (errors) {
      timer = setTimeout(() => setErrors(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [errors]);

  return (
    <Container>
      {post && (
        <Card className="mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col
                xs={12}
                md={3}
                className="d-flex justify-content-center mb-3"
              >
                <Asset src={image} alt="Post Image" height="200" width="200" />
              </Col>
              <Col
                xs={12}
                md={9}
                className="d-flex flex-column align-items-center align-items-md-start"
              >
                <Card.Title className="text-center text-md-left">
                  {title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center text-md-left">
                  Posted by {owner}
                </Card.Subtitle>
                <Card.Text className="text-center text-md-left">
                  {content}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="reportReason">
          <Form.Label>Reason for Report</Form.Label>
          <Form.Control
            as="select"
            name="reason"
            value={reason}
            onChange={handleChange}
          >
            <option value="">Select a reason</option>
            <option value="spam">Spam</option>
            <option value="inappropriate">Inappropriate Content</option>
            <option value="harassment">Harassment</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        {errors?.reason?.map((message, idx) => (
          <Alert className={postStyles.ErrorAlert} key={idx}>
            {message}
          </Alert>
        ))}

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
        {errors?.custom_reason?.map((message, idx) => (
          <Alert className={postStyles.ErrorAlert} key={idx}>
            {message}
          </Alert>
        ))}

        {errors?.non_field_errors?.map((message, idx) => (
          <Alert className={postStyles.ErrorAlert} key={idx}>
            {message}
          </Alert>
        ))}

        <Button type="submit" className={`mt-3 ${btnStyles.Button}`}>
          Submit Report
        </Button>
      </Form>
    </Container>
  );
};

export default ReportCreateForm;
