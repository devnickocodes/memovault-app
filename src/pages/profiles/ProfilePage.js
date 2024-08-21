import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Asset from "../../components/Asset";
import PopularProfilesMostPosts from "./PopularProfilesMostPosts";
import PopularPosts from "../posts/PopularPosts";
import Post from "../posts/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import NoResults from "../../assets/no-results.jpg";
import { fetchMoreData } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Button.module.css";
import navStyles from "../../styles/NavBar.module.css";
import postStyles from "../../styles/Post.module.css";
import profilePageStyles from "../../styles/ProfilePage.module.css";
import avatarStyles from "../../styles/Avatar.module.css";
import { ProfileEditDropdown } from "../../components/DropdownOptions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);

  const { id } = useParams();
  const { profileData } = useProfileData();
  const pageProfile = profileData?.pageProfile;
  const profile = pageProfile?.results[0];
  const currentUser = useCurrentUser()
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const {setProfileData, handleFollow} = useSetProfileData();

  const [error, setError] = useState(null)

  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profileData }, { data: profilePosts }] = await Promise.all([
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
        // console.log(err)
        if (err.response?.status === 404) {
          history.push("/not-found");
        } else {
          setError("Sorry, an error occurred. Please try again.");
        }
      }
    };
    fetchData();
  }, [id, setProfileData]);

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  const mainProfile = (
    <Card className={profilePageStyles.ProfileCard}>
      {error && <Alert className={`${postStyles.Alert} ${postStyles.ErrorAlert}`}>{error}</Alert>}
      <Card.Body className={profilePageStyles.PositionRelative}>
      {profile?.is_owner && (
          <div className={profilePageStyles.PositionDropdown}>
            <ProfileEditDropdown id={profile?.id} />
          </div>
        )}
        <Row>
          <Col lg={4} className="text-center mb-2">
            <Image
              src={profile?.image}
              alt={`${profile?.owner}'s profile image`}
              className={avatarStyles.Avatar}
              roundedCircle
              width={175}
              height={175}
            />
          </Col>
          <Col className="text-center" lg={8}>
            <Card.Title className="mb-2">{profile?.owner}</Card.Title>
            {profile?.follows_you && <Card.Text className="text-muted font-italic">follows you</Card.Text>}
            {profile?.name && <Card.Subtitle className="my-2">{profile?.name}</Card.Subtitle>}
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
            {profile?.hobbies && <Card.Text>{profile?.hobbies}</Card.Text>}
            {currentUser && !profile?.is_owner && 
            (profile?.following_id ? (
                <Button className={`${styles.Button} ${styles.GreyButton}`}>unfollow</Button>
            ) : (
                <Button onClick={() => handleFollow(profile)} className={styles.Button}>follow</Button>
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
