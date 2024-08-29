import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ScrollToTop from 'react-scroll-to-top';
import Asset from '../../components/Asset';
import PopularProfilesMostPosts from './PopularProfilesMostPosts';
import PopularPosts from '../posts/PopularPosts';
import Post from '../posts/Post';
import NoResults from '../../assets/no-results.jpg';
import { fetchMoreData } from '../../utils/utils';
import { axiosReq } from '../../api/axiosDefaults';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Button.module.css';
import navStyles from '../../styles/NavBar.module.css';
import postStyles from '../../styles/Post.module.css';
import profilePageStyles from '../../styles/ProfilePage.module.css';
import avatarStyles from '../../styles/Avatar.module.css';
import { ProfileEditDropdown } from '../../components/DropdownOptions';
import postsStyles from '../../styles/PostsPage.module.css';

/**
 * The ProfilePage component displays a user's profile information
 * and their posts. It handles fetching profile and post data,
 * managing loading states and errors, and providing follow/unfollow functionality.
 */
function ProfilePage() {
  // State to track if the data has been successfully loaded
  const [hasLoaded, setHasLoaded] = useState(false);

  // State to store profile posts
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  // State to manage error messages
  const [error, setError] = useState(null);

  // Get the profile ID from URL parameters
  const { id } = useParams();

  // Contexts for profile data and current user
  const { profileData } = useProfileData();
  const pageProfile = profileData?.pageProfile;
  const profile = pageProfile?.results[0];
  const currentUser = useCurrentUser();

  // Functions to update profile data and handle follow actions
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();

  // Hook to navigate
  const history = useHistory();

  /**
   * Fetches the profile data and posts for the given profile ID.
   * Updates the profile data context and profile posts state.
   * Handles errors, including redirecting to a "not found" page if the profile is not found.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile and posts data
        const [{ data: profileData }, { data: profilePosts }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
        ]);

        // Update profile data context
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [profileData] },
        }));

        // Update state with profile posts
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err)
        // Handle errors, such as profile not found
        if (err.response?.status === 404) {
          history.push('/not-found');
        } else {
          setError('Sorry, an error occurred. Please try again.');
        }
      }
    };
    fetchData();
  }, [id, setProfileData, history]);

  /**
   * Clears the error message after 3 seconds.
   */
  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  /**
   * Renders the profile card, including profile information and
   * a follow/unfollow button based on the user's current state.
   */
  const mainProfile = (
    <Card className={profilePageStyles.ProfileCard}>
      {error && (
        <Alert className={`${postStyles.Alert} ${postStyles.ErrorAlert}`}>
          {error}
        </Alert>
      )}
      <Card.Body className={profilePageStyles.PositionRelative}>
        {currentUser && profile?.is_owner && (
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
            {profile?.follows_you && (
              <Card.Text className="text-muted font-italic">
                follows you
              </Card.Text>
            )}
            {profile?.name && (
              <Card.Subtitle className="my-2">{profile?.name}</Card.Subtitle>
            )}
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
            {currentUser
              && !profile?.is_owner
              && (profile?.following_id ? (
                <Button onClick={() => handleUnfollow(profile)} className={`${styles.Button} ${styles.GreyButton}`}>
                  unfollow
                </Button>
              ) : (
                <Button
                  onClick={() => handleFollow(profile)}
                  className={styles.Button}
                >
                  follow
                </Button>
              ))}
          </Col>
        </Row>
        <Row className="mt-4 text-center">
          <Col>{profile?.bio && <p>{profile?.bio}</p>}</Col>
        </Row>
      </Card.Body>
    </Card>
  );

  /**
   * Renders the profile's posts with infinite scroll functionality.
   * Shows a loading spinner while fetching more posts and handles
   * cases where no posts are available.
   */
  const mainProfilePosts = (
    <>
      <hr />
      <p className={`text-center ${navStyles.Logo}`}>
        {profile?.owner}
        's
        <span>posts</span>
      </p>
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
          height={250}
          width={250}
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
          borderRadius="10px"
        />
      )}
    </>
  );

  return (
    <>
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
      {/* Scroll to top button */}
      <ScrollToTop className={postsStyles.ScrollToTop} color="purple" smooth />
    </>
  );
}

export default ProfilePage;
