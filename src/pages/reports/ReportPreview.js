import React from 'react';
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { Button, Card } from 'react-bootstrap';
import postStyles from "../../styles/Post.module.css";

const ReportPreview = ({ report }) => {
  console.log('REPORT: ', report);

  const customReason = report?.custom_reason || '';
  const postTitle = report?.post?.title || '';
  const postContent = report?.post?.content || '';

  return (
    <Card className={`${postStyles.Container} mb-4`}>
      <Card.Body>
        <p>{report?.owner}</p>
        <Card.Title className={`${postStyles.CardTitle} mb-3`}>
          Reason for report: {report?.reason}
        </Card.Title>
        <Card.Subtitle className="mb-3">
          <span className={`${postStyles.CardTitle}`}>Additional Reason:</span> 
          {customReason.length > 10 ? `${customReason.slice(0, 100)}...` : customReason}
        </Card.Subtitle>
        <Card.Subtitle className="mb-3">
          <span className={`${postStyles.CardTitle}`}>Reported Post Title: </span> 
          {postTitle.length > 100 ? `${postTitle.slice(0, 100)}...` : postTitle}
        </Card.Subtitle>
        <Card.Text>
          <span className={`${postStyles.CardTitle}`}>Reported Post Content: </span> 
          {postContent.length > 100 ? `${postContent.slice(0, 100)}...` : postContent}
        </Card.Text>
        <Link to={`/reports/${report?.id}`}>
          <Button className={btnStyles.Button}>View Full Report</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ReportPreview;
