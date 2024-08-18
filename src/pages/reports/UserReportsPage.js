import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import postsPageStyles from "../../styles/PostsPage.module.css"

import PopularProfilesMostPosts from "../profiles/PopularProfilesMostPosts";
import ScrollToTop from "react-scroll-to-top";
import PopularPosts from "../posts/PopularPosts";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert, Button, Card } from "react-bootstrap";
import postStyles from "../../styles/Post.module.css"
import navStyles from "../../styles/NavBar.module.css"
import Asset from "../../components/Asset"
import NoResults from "../../assets/no-results.jpg"
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css"


const UserReportPage = ({message}) => {

  const [reports, setReports] = useState({results: []})
  const [error, setError] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const currentUser = useCurrentUser()

  useEffect(()=> {
    const handleMount = async () => {
      try {
        const { data: reportsData } = await axiosReq.get(`/reports/`);
        const reportsWithPostDetails = await Promise.all(
          reportsData.results.map(async (report) => {
            const { data: postData } = await axiosReq.get(`/posts/${report.post}/`);
            return {
              ...report,
              post: postData
            }
          })
        )
        setReports({ results: reportsWithPostDetails });
        setLoaded(true);
      } catch{
        setError("Sorry an error occurred. Please try again.")
      }
    }
    handleMount()
  }, [currentUser])

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);
 
    return (
    <Row className="h-100">
      {error && <Alert className={`${postStyles.Alert} ${postStyles.ErrorAlert}`}>{error}</Alert>}
      <Col lg={8} className="py-2 p-0 p-lg-2">
      <PopularProfilesMostPosts mobile />
        <Container className="mt-3">
          <p className={navStyles.Logo}>My <span>Reports</span></p> 
          {loaded ? (
            <>
            {reports.results.length ? (
              reports.results.map((report) => (
                <Card className={`${postStyles.Container} mb-4`}>
                  <Card.Body>
                    <Card.Title className={`${postStyles.CardTitle} mb-3`}>Reason for report: {report?.reason}</Card.Title>
                    <Card.Subtitle className="mb-3"><span className={`${postStyles.CardTitle}`}>Additional Reason:</span> {report?.custom_reason.length > 10 ? `${report?.custom_reason.slice(0, 100)}...` : report?.custom_reason}</Card.Subtitle>
                    <Card.Subtitle className="mb-3"><span className={`${postStyles.CardTitle}`}>Reported Post Title: </span> {report.post?.title.length > 100 ? `${report.post?.title.slice(0, 100)}...` : report.post?.title}</Card.Subtitle>
                    <Card.Text><span className={`${postStyles.CardTitle}`}>Reported Post Content: </span> {report.post?.content.length > 100 ? `${report.post?.content.slice(0, 100)}...` : report.post?.content}</Card.Text>
                    <Link to={`/reports/${report?.id}`}><Button className={btnStyles.Button}>View Full Report</Button></Link>
                  </Card.Body>
               </Card>
                
              ))
            ) : (<Asset
                  height={200}
                  width={200}
                  src={NoResults}
                  message={message}
                />)}
            </>
          ) : (
            <Asset spinner/>
          )}
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
  );
}


export default UserReportPage