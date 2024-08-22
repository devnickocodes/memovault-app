import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Asset from '../../components/Asset';
import PopularPosts from '../posts/PopularPosts';
import PopularProfilesMostPosts from '../profiles/PopularProfilesMostPosts';
import { DropdownOptions } from '../../components/DropdownOptions';
import ConfirmationModal from '../../utils/ConfirmationModal';
import navStyles from '../../styles/NavBar.module.css';
import styles from '../../styles/FullReportDetailsCard.module.css';
import btnStyles from '../../styles/Button.module.css';
import postsPageStyles from '../../styles/PostsPage.module.css';
import postStyles from '../../styles/Post.module.css';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import ScrollToTop from 'react-scroll-to-top';
import { scrollToTop } from '../../utils/scrollToTop';
import { useRedirectIfNotAdmin } from '../../hooks/useRedirectIfNotAdmin';
import { useCheckOwnership } from '../../hooks/useCheckOwnership';
import { useRedirect } from '../../hooks/useRedirect';
import { useSuccessAlert } from '../../contexts/SuccessAlertContext';



const FullReportDetailsCard = ({apiEndpoint}) => {

    const {id} = useParams()
    const [report, setReport] = useState({});
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {is_owner, is_admin} = report
    const history = useHistory()
    const handleScroll = () => scrollToTop()
    const { setAlert } = useSuccessAlert();

    useRedirectIfNotAdmin(apiEndpoint, "/");
    useCheckOwnership(id, apiEndpoint);
    useRedirect("loggedOut")

    useEffect(() => {
      const handleMount = async () => {
          try {
              const { data: reportData } = await axiosReq.get(`${apiEndpoint}/${id}`);
              const { data: postData } = await axiosReq.get(`/posts/${reportData.post}`);
              setReport({ ...reportData, post: postData });
              setLoaded(true);
          } catch (err) {
            // console.log(err)
              if (err.response?.status === 404) {
                  history.push('/not-found');
              } else {
                  setError("Sorry, an error occurred. Please try again.");
              }
          }
      };

      handleMount();
  }, [id, apiEndpoint, history]);

    const handleDelete = async () => {
      try {
        await axiosRes.delete(`${apiEndpoint}/${id}/`);
        history.goBack();
        setAlert({ message: "Report has been deleted!" });
      } catch (err) {
        // console.log(err)
        setError("Something went wrong while trying to delete the report. Please try again in a moment.");
      }
    };

    const handleEdit = () => {
      history.push(`/reports/${id}/edit`);
    };


    return (
      <>
        <Row className="h-100">
        {error && <Alert className={`${postStyles.Alert} ${postStyles.ErrorAlert}`}>{error}</Alert>}
        <Col lg={8} className="py-2 p-0 p-lg-2">
        <PopularProfilesMostPosts mobile />
          <Container className="mt-3">
          <Card className={styles.Card}>
          {is_owner ? (
                <div className='text-right p-2'>
                  <DropdownOptions
                  handleEdit={handleEdit}
                  handleDelete={() => setShowDeleteModal(true)}
                />
                </div>
              ): (
                <div className='text-right p-2'>
                  <DropdownOptions
                  isAdmin={is_admin}
                  handleEdit={handleEdit}
                  handleDelete={() => setShowDeleteModal(true)}
                />
                </div>
              )}
            <Card.Body>
                {!loaded ? (
                    <Asset spinner />
                ) : error ? (
                    <Alert>{error}</Alert>
                ) : (
                    <>
                       <Card.Title className={`${styles.cardTitle} ${navStyles.Logo} ${styles.Bold} mb-4 text-center`}>Full Report <span>Details</span></Card.Title>
                       <Card.Subtitle className={`${styles.cardSubtitle} mb-3`}>Reason for report: </Card.Subtitle>
                       <Card.Text className={styles.cardText}>{report?.reason}</Card.Text>
                       <Card.Subtitle className={`${styles.cardSubtitle} mb-3`}>Additional Reason: </Card.Subtitle>
                       <Card.Text className={styles.cardText}>{report?.custom_reason}</Card.Text>
                       <Card.Subtitle className={`${styles.cardSubtitle} mb-3`}>Reported Post Title: </Card.Subtitle>
                       <Card.Text className={styles.cardText}>{report?.post?.title}</Card.Text>
                       <Card.Subtitle className={`${styles.cardSubtitle} mb-3`}>Reported Post Content: </Card.Subtitle>
                       <Card.Text className={styles.cardText}>{report?.post?.content}</Card.Text>
                       <Card.Subtitle className={`text-muted mb-3`}>Report Issued On: {report?.updated_at}</Card.Subtitle>
                       <Link to={`/posts/${report.post?.id}`}>
                        <Button onClick={handleScroll} className={btnStyles.Button}>Go To Post</Button>
                       </Link>
                    </>
                )}
            </Card.Body>
        </Card>
          </Container>
        </Col>
  
        <Col lg={4} className="d-none d-lg-flex flex-column p-lg-2">
          <div className="d-lg-none mb-3">
            <PopularProfilesMostPosts />
          </div>
          <div className="d-none d-lg-flex flex-column">
            <PopularProfilesMostPosts />
            <PopularPosts />
          </div> 
        </Col>
      <ScrollToTop className={postsPageStyles.ScrollToTop} color="purple" smooth />
      </Row>
      <ConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this report?"
        optionalMessage="This cannot be undone!"
      />
      </>
    );
};
export default FullReportDetailsCard