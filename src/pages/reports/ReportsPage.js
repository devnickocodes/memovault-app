import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-to-top";
import postsPageStyles from "../../styles/PostsPage.module.css";
import postStyles from "../../styles/Post.module.css";
import navStyles from "../../styles/NavBar.module.css";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.jpg";
import PopularProfilesMostPosts from "../profiles/PopularProfilesMostPosts";
import PopularPosts from "../posts/PopularPosts";
import ReportPreview from "./ReportPreview";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import { useRedirectIfNotAdmin } from "../../hooks/useRedirectIfNotAdmin";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


const ReportsPage = ({ apiEndpoint, title, message, adminOnly }) => {
  const [reports, setReports] = useState({ results: [], next: null });
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const currentUser = useCurrentUser();


  useRedirectIfNotAdmin(apiEndpoint, '/');

  console.log(apiEndpoint)

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: reportsData } = await axiosReq.get(apiEndpoint);
        const reportsWithPostDetails = await Promise.all(
          reportsData.results.map(async (report) => {
            const { data: postData } = await axiosReq.get(`/posts/${report.post}/`);
            return { ...report, post: postData };
          })
        );
        setReports({ results: reportsWithPostDetails, next: reportsData.next });
        setLoaded(true);
      } catch {
        setError("Sorry, an error occurred. Please try again.");
      }
    };

    handleMount();
  }, [apiEndpoint, currentUser]);

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
          {adminOnly ? (
            <p className={navStyles.Logo}>All <span>{title}</span></p>
          ) : (
            <p className={navStyles.Logo}>My <span>{title}</span></p>
          )}
          {loaded ? (
            <>
              {reports.results.length ? (
                <InfiniteScroll
                  children={
                    reports.results.map((report) => (
                      <ReportPreview key={report.id} report={report} apiEndpoint={apiEndpoint} />
                    ))
                  }
                  dataLength={reports.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!reports.next}
                  next={() => fetchMoreData(reports, setReports)}
                />
              ) : (
                <Asset height={200} width={200} src={NoResults} message={message} />
              )}
            </>
          ) : (
            <Asset spinner />
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
};

export default ReportsPage;
