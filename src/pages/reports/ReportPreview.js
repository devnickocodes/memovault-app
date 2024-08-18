import React from 'react'
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css"
import { Button, Card } from 'react-bootstrap';
import postStyles from "../../styles/Post.module.css"

const ReportPreview = ({report}) => {
  return (
    <Card className={`${postStyles.Container} mb-4`}>
        <Card.Body>
            <p>{report?.owner}</p>
            <Card.Title className={`${postStyles.CardTitle} mb-3`}>Reason for report: {report?.reason}</Card.Title>
            <Card.Subtitle className="mb-3"><span className={`${postStyles.CardTitle}`}>Additional Reason:</span> {report?.custom_reason.length > 10 ? `${report?.custom_reason.slice(0, 100)}...` : report?.custom_reason}</Card.Subtitle>
            <Card.Subtitle className="mb-3"><span className={`${postStyles.CardTitle}`}>Reported Post Title: </span> {report.post?.title.length > 100 ? `${report.post?.title.slice(0, 100)}...` : report.post?.title}</Card.Subtitle>
            <Card.Text><span className={`${postStyles.CardTitle}`}>Reported Post Content: </span> {report.post?.content.length > 100 ? `${report.post?.content.slice(0, 100)}...` : report.post?.content}</Card.Text>
            <Link to={`/reports/${report?.id}`}><Button className={btnStyles.Button}>View Full Report</Button></Link>
        </Card.Body>
    </Card>
  )
}

export default ReportPreview