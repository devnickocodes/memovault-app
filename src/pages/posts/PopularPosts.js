import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "../../styles/PopularProfiles.module.css";
import navStyles from "../../styles/NavBar.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import PopularPost from "./PopularPost";

const PopularPosts = ({mobile}) => {
  const [postData, setPostData] = useState({
    popularPosts: { results: [] },
  });

  const { popularPosts } = postData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/posts/?ordering=-post_likes_count"
        );
        setPostData((prevState) => ({
          ...prevState,
          popularPosts: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

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
