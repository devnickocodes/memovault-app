import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';

import Avatar from '../../components/Avatar';

import postStyles from "../../styles/Post.module.css";
import styles from "../../styles/PopularPost.module.css";

import { scrollToTop } from '../../utils/scrollToTop';


const PopularPost = ({ post }) => {
  const { id, owner, profile_id, profile_image, title, content, image, post_likes_count, updated_at } = post;
  const handleScroll = () => scrollToTop()


  return (
    <Container className="p-3">
      <Card className={styles.PopularPostCard}>
        <Card.Header className={styles.PopularPostHeader}>
          <Link to={`/profiles/${profile_id}/`} className={postStyles.avatarImage}>
            <Avatar src={profile_image} />
            <strong>{owner}</strong>
          </Link>
        </Card.Header>

        <Link to={`/posts/${id}/`}>
          <div className={styles.ImageWrapper}>
            <Card.Img onClick={handleScroll} variant="top" src={image} className={styles.CardImage} />
          </div>
        </Link>
        <Card.Body>
          <Card.Title className="text-center mb-3">
          {title.length > 100 ? `${title.slice(0, 20)}...` : title}
          </Card.Title>
          <Card.Text className="text-center">
            {content.length > 100 ? `${content.slice(0, 100)}...` : content}
          </Card.Text>
        </Card.Body>

        <Card.Footer className={`${styles.PopularPostFooter} d-flex justify-content-between align-items-center`}>
          <div>
          <i className={`fa-solid fa-heart mr-1 ${postStyles.HeartNoHover}`}></i>
          {post_likes_count}
          </div>
          <small className="text-muted">{updated_at}</small>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default PopularPost;
