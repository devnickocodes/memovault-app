import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ReportPreview.module.css";
import popularProfilesStyles from "../../styles/PopularProfiles.module.css"

import { scrollToTop } from '../../utils/scrollToTop';

const ReportPreview = ({ report, apiEndpoint }) => {

  const customReason = report?.custom_reason || '';
  const postTitle = report?.post?.title || '';
  const postContent = report?.post?.content || '';

  const handleScroll = () => scrollToTop()

  return (
    <Card className={`${popularProfilesStyles.Container} mb-4`}>
      <Card.Body>
        {report.is_admin && (
          <Card.Title className={`${styles.CardTitle} mb-3`}>
              <span className={styles.Label}>Submitted by: </span>
              <span>{report?.owner}</span>
          </Card.Title>
        )}
        
        <Card.Title className={`${styles.CardTitle} mb-3`}>
          <span className={styles.Label}>Reason: </span>
          <span className={styles.Value}>{report?.reason}</span>
        </Card.Title>
            
       {customReason && (
        <Card.Subtitle className={`${styles.CardSubtitle} mb-3`}>
            <span className={styles.Label}>Additional Reason: </span>
            <span className={styles.Value}>
                {customReason.length > 100 ? `${customReason.slice(0, 100)}...` : customReason}
            </span>
        </Card.Subtitle>
       )}

        
      <Card.Subtitle className={`${styles.CardSubtitle} mb-3`}>
                    <span className={styles.Label}>Post Title: </span>
                    <span>
                        {postTitle.length > 100 ? `${postTitle.slice(0, 100)}...` : postTitle}
                    </span>
                </Card.Subtitle>


                <Card.Text className="mb-4">
                    <span className={styles.Label}>Post Content: </span>
                    <span>
                        {postContent.length > 100 ? `${postContent.slice(0, 100)}...` : postContent}
                    </span>
                </Card.Text>


        <Link to={`${apiEndpoint}/${report?.id}`}>
          <Button onClick={handleScroll} className={btnStyles.Button}>View Full Report</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ReportPreview;
