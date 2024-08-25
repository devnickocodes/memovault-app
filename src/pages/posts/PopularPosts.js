import React from "react";
import Container from "react-bootstrap/Container";
import styles from "../../styles/PopularProfiles.module.css";
import navStyles from "../../styles/NavBar.module.css";
import Asset from "../../components/Asset";
import PopularPost from "./PopularPost";
import { usePopularPostData } from "../../contexts/PopularPostDataContext";

/**
 * PopularPosts component displays a list of popular posts.
 * 
 * It uses the `usePopularPostData` hook to fetch popular post data and
 * handles loading states and errors. If there are popular posts, it displays
 * up to 3 of them using the `PopularPost` component. If an error occurs,
 * it displays the error message. While data is loading, a spinner is shown.
 */
const PopularPosts = ({ setPosts, mobile }) => {
  // Extract popular post data and error from context
  const { postData, error } = usePopularPostData();
  const { popularPosts } = postData;

  return (
    <Container className={`mt-3 ${styles.Container} ${mobile && 'd-none d-lg-block'}`}>
      {/* Display error message if there is an error */}
      {error ? (
        <p>{error}</p>
      ) :
      // Display popular posts if available
      popularPosts.results.length ? (
        <>
          <p className={`text-center p-2 ${styles.Header} ${navStyles.Logo}`}>
            Popular <span>Posts</span>
          </p>
          {popularPosts.results.slice(0, 3).map((post) => (
            // Render PopularPost component for each post
            <PopularPost key={post.id} post={post} setPosts={setPosts} />
          ))}
        </>
      ) : (
        // Display spinner while data is loading
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularPosts;
