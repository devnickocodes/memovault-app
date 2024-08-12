import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import PopularProfilesMostPosts from "./PopularProfilesMostPosts";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Card, Image } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularPosts from "../posts/PopularPosts";
import Post from "../posts/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.jpg"
import navStyles from "../../styles/NavBar.module.css"

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);

  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { profileData } = useProfileData();
  const pageProfile = profileData?.pageProfile;
  const profile = pageProfile?.results[0];
  const currentUser = useCurrentUser()
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profileData }, { data: profilePosts }] =
        await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [profileData] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <Card className={styles.ProfileCard}>
      <Card.Body>
        <Row>
          <Col lg={4} className="text-center mb-2">
            <Image
              src={profile?.image}
              alt={`${profile?.owner}'s profile image`}
              className={styles.ProfileImage}
              roundedCircle
              width={175}
              height={175}
            />
          </Col>
          <Col className="text-center" lg={8}>
            <Card.Title className="mb-2">{profile?.owner}</Card.Title>
            <Card.Text>
              {profile?.follows_you ? "Follows you" : "Does not follow you"}
            </Card.Text>
            <Card.Subtitle className="mb-2">
              {profile?.name} Placeholder Name
            </Card.Subtitle>
            <Row className="justify-content-center mb-3">
                <Col>
                    <div>{profile?.posts_count}</div>
                    <div>posts</div>
                </Col>
                <Col>
                    <div>{profile?.followers_count}</div>
                    <div>followers</div>
                </Col>
                <Col>
                    <div>{profile?.following_count}</div>
                    <div>following</div>
                </Col>
            </Row>
            {profile?.hobbies ? (
              <Card.Text>{profile?.hobbies}</Card.Text>
            ) : (
              <p>No Hobbies</p>
            )}
            {currentUser && !profile?.is_owner && 
            (profile?.following_id ? (
                <Button className={btnStyles.Button}>unfollow</Button>
            ) : (
                <Button className={btnStyles.Button}>follow</Button>
            ))}
          </Col>
        </Row>
        <Row className="mt-4 text-center">
          <Col>{profile?.bio ? <p>{profile?.bio}</p> : <p>No Bio</p>}</Col>
        </Row>
      </Card.Body>
    </Card>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className={`text-center ${navStyles.Logo}`}>{profile?.owner}'s <span>posts</span></p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfilesMostPosts mobile />
        <Container>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfilesMostPosts />
        <PopularPosts />
      </Col>
    </Row>
  );
}

export default ProfilePage;
