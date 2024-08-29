import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/ReportPreview.module.css';
import popularProfilesStyles from '../../styles/PopularProfiles.module.css';

import { scrollToTop } from '../../utils/scrollToTop';

/**
 * ReportPreview is a component that displays a brief preview of a report.
 * It includes details such as the reason for the report,
 * any additional custom reason provided by the user, and the associated post's
 * title and content. It also provides a link to view the full report.
 */
const ReportPreview = ({ report, apiEndpoint }) => {
  // Extract custom reason, post title, and content from the report object with fallback defaults
  const customReason = report?.custom_reason || '';
  const postTitle = report?.post?.title || '';
  const postContent = report?.post?.content || '';

  /**
   * handleScroll is used to scroll to the top of the page when navigating to the full report.
   * This is triggered when the "View Full Report" button is clicked.
   */
  const handleScroll = () => scrollToTop();

  return (
    <Card className={`${popularProfilesStyles.Container} mb-4`}>
      <Card.Body>
        {/* Display the owner's name only for admins. */}
        {report.is_admin && (
          <Card.Title className={`${styles.CardTitle} mb-3`}>
            <span className={styles.Label}>Submitted by: </span>
            <span>{report?.owner}</span>
          </Card.Title>
        )}

        {/* Display the reason for the report */}
        <Card.Title className={`${styles.CardTitle} mb-3`}>
          <span className={styles.Label}>Reason: </span>
          <span className={styles.Value}>{report?.reason}</span>
        </Card.Title>

        {/* Display the custom reason if it exists, truncating if it's too long */}
        {customReason && (
        <Card.Subtitle className={`${styles.CardSubtitle} mb-3`}>
          <span className={styles.Label}>Additional Reason: </span>
          <span className={styles.Value}>
            {customReason.length > 100 ? `${customReason.slice(0, 100)}...` : customReason}
          </span>
        </Card.Subtitle>
        )}

        {/* Display the title of the associated post, truncating if it's too long */}
        <Card.Subtitle className={`${styles.CardSubtitle} mb-3`}>
          <span className={styles.Label}>Post Title: </span>
          <span>
            {postTitle.length > 100 ? `${postTitle.slice(0, 100)}...` : postTitle}
          </span>
        </Card.Subtitle>

        {/* Display the content of the associated post, truncating if it's too long */}
        <Card.Text className="mb-4">
          <span className={styles.Label}>Post Content: </span>
          <span>
            {postContent.length > 100 ? `${postContent.slice(0, 100)}...` : postContent}
          </span>
        </Card.Text>

        {/* Link to the full report using the provided API endpoint and report ID */}
        <Link to={`${apiEndpoint}/${report?.id}`}>
          <Button onClick={handleScroll} className={btnStyles.Button}>View Full Report</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ReportPreview;
