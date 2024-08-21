import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import btnStyles from "../../styles/Button.module.css";
import postStyles from "../../styles/Post.module.css";
import { scrollToTop } from '../../utils/scrollToTop';

const ReportPreview = ({ report, apiEndpoint }) => {

  const customReason = report?.custom_reason || '';
  const postTitle = report?.post?.title || '';
  const postContent = report?.post?.content || '';

  const handleScroll = () => scrollToTop()

  return (
    <Card className={`${postStyles.Container} mb-4`}>
      <Card.Body>
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
        <Link to={`${apiEndpoint}/${report?.id}`}>
          <Button onClick={handleScroll} className={btnStyles.Button}>View Full Report</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ReportPreview;
