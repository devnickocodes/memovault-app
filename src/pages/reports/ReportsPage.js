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
import { useRedirect } from "../../hooks/useRedirect";

/**
 * ReportsPage is a component that displays a list of reports.
 * It fetches reports from the given API endpoint and displays them in an infinite scroll 
 * view with the ability to view more details. If apiEndpoint is leading to admins-only page
 * the list of reports will contain all the reports created, if it is leading to users' page
 * the list of reports will contain only reports that are created by the currently logged-in user.
 */
const ReportsPage = ({ apiEndpoint, title, message, adminOnly }) => {
  // State to hold the list of reports and pagination data
  const [reports, setReports] = useState({ results: [], next: null });
  // State to manage any errors encountered while fetching data
  const [error, setError] = useState(null);
  // State to track whether the data has finished loading
  const [loaded, setLoaded] = useState(false);
  // Fetch the current user information from context
  const currentUser = useCurrentUser();

  // Redirect to home if the user is not an admin
  useRedirectIfNotAdmin(apiEndpoint, '/');
  // Redirect users to login if they are not logged in
  useRedirect("loggedOut")

  useEffect(() => {
    /**
     * handleMount fetches the initial set of reports from the API,
     * and augments each report with its corresponding post details.
     */
    const handleMount = async () => {
      try {
        // Fetch reports from the API
        const { data: reportsData } = await axiosReq.get(apiEndpoint);

        // Fetch related post data for each report and merge it with the report data
        const reportsWithPostDetails = await Promise.all(
          reportsData.results.map(async (report) => {
            const { data: postData } = await axiosReq.get(`/posts/${report.post}/`);
            return { ...report, post: postData };
          })
        );

        // Update state with the fetched reports and pagination info
        setReports({ results: reportsWithPostDetails, next: reportsData.next });
        setLoaded(true);
      } catch (err) {
        // console.log(err)
        // Handle errors
        setError("Sorry, an error occurred. Please try again.");
      }
    };

    handleMount();
  }, [apiEndpoint, currentUser]);

  useEffect(() => {
    /**
     * Clears the error message after 3 seconds if an error occurs.
     */
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Row className="h-100">
      {/* Display an error message if one occurs */}
      {error && <Alert className={`${postStyles.Alert} ${postStyles.ErrorAlert}`}>{error}</Alert>}

      <Col lg={8} className="py-2 p-0 p-lg-2">
        {/* Display a list of popular profiles for mobiles */}
        <PopularProfilesMostPosts mobile />
        <Container className="mt-3">
          {/* Display the appropriate title based on the adminOnly flag */}
          {adminOnly ? (
            <p className={navStyles.Logo}>All <span>{title}</span></p>
          ) : (
            <p className={navStyles.Logo}>My <span>{title}</span></p>
          )}

          {/* Conditionally render the list of reports or a loading indicator */}
          {loaded ? (
            <>
              {reports.results.length ? (
                // InfiniteScroll component to handle fetching and displaying additional reports
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
                // Display a message and image if no reports are found
                <Asset message={message} src={NoResults} alt="Not Found" height={200} width={200} borderRadius="10px"/>
              )}
            </>
          ) : (
            // Display a loading spinner while reports are being fetched
            <Asset spinner />
          )}
        </Container>
      </Col>

      <Col lg={4} className="d-none d-lg-flex flex-column p-lg-2">
        {/* Display additional content for larger screens */}
        <div className="d-lg-none mb-3">
          <PopularProfilesMostPosts />
        </div>
        <div className="d-none d-lg-flex flex-column">
          <PopularProfilesMostPosts />
          <PopularPosts />
        </div>
      </Col>
      
      {/* Scroll-to-top button */}
      <ScrollToTop className={postsPageStyles.ScrollToTop} color="purple" smooth />
    </Row>
  );
};

export default ReportsPage;
