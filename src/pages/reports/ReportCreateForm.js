import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

const ReportForm = () => {
  const [reportData, setReportData] = useState({
    reason: "",
    custom_reason: "",
  });
  const { reason, custom_reason } = reportData;
  const [errors, setErrors] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  const handleChange = (event) => {
    setReportData({
      ...reportData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axiosRes.post("/reports/", {
        post: id,
        ...reportData,
        custom_reason: reason === "other" ? custom_reason : "",
      });
      history.push(`/reports/${data.id}`);
    } catch (err) {
        if (err.response?.status !== 401) {
            console.log("Errors:", err.response?.data); 
          setErrors(err.response?.data);
        }
      }
    };

  return (
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
              <Alert variant="warning" key={idx}>
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
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

        {errors?.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button type="submit" className="mt-2">
        Submit Report
      </Button>
    </Form>
  );
};

export default ReportForm;
