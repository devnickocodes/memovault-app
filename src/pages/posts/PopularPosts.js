import React from "react";
import { Container } from "react-bootstrap";
import styles from "../../styles/PopularProfiles.module.css";
import navStyles from "../../styles/NavBar.module.css";
import Asset from "../../components/Asset";
import PopularPost from "./PopularPost";
import { usePopularPostData } from "../../contexts/PopularPostDataContext";

const PopularPosts = ({mobile}) => {

  const {popularPosts} = usePopularPostData()

  return (
    <Container className={`mt-3 ${styles.Container} ${mobile && 'd-none d-lg-block'}`}>
      {popularPosts.results.length ? (
        <>
          <p className={`text-center p-2 ${styles.Header} ${navStyles.Logo}`}>
            Popular <span>Posts</span>
          </p>
          {popularPosts.results.slice(0, 3).map((post) => (
            <PopularPost key={post.id} post={post} />
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularPosts;
