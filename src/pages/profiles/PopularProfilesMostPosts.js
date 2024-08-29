import React from 'react';
import Container from 'react-bootstrap/Container';
import Asset from '../../components/Asset';
import Profile from './Profile';
import navStyles from '../../styles/NavBar.module.css';
import styles from '../../styles/PopularProfiles.module.css';
import { useProfileData } from '../../contexts/ProfileDataContext';

const PopularProfilesMostPosts = ({ mobile }) => {
  // Fetch profile data and potential errors from the context
  const { profileData, popularProfilesError, mostPostsError } = useProfileData();
  const { popularProfiles, mostPosts } = profileData;

  return (
    <>
      <Container className={`${styles.Container} mb-3 ${mobile && 'd-lg-none text-center mb-2'}`}>
        {/* Show error message if there's an error fetching popular profiles */}
        {popularProfilesError ? (
          <p>{popularProfilesError}</p>
        )
        // Check if there are popular profiles to display
          : popularProfiles.results.length ? (
            <>
              <p className={`text-center p-2 ${styles.Header} ${navStyles.Logo}`}>
                Popular
                {' '}
                <span>Profiles</span>
              </p>
              {/* Render profiles based on screen size */}
              {mobile ? (
              // Mobile view
                <div className="d-flex justify-content-around">
                  {popularProfiles.results.slice(0, 3).map((profile) => (
                    <Profile key={profile.id} profile={profile} mobile />
                  ))}
                </div>
              ) : (
                // Desktop view
                popularProfiles.results.slice(0, 3).map((profile) => (
                  <Profile key={profile.id} profile={profile} />
                ))
              )}
            </>
          ) : (
          // Show a spinner if there are no popular profiles yet
            <Asset spinner />
          )}
      </Container>

      <Container className={`${styles.Container} ${mobile && 'd-lg-none text-center mb-2'}`}>
        {/* Show error message if there's an error fetching most posts */}
        {mostPostsError ? (
          <p>{mostPostsError}</p>
        )
        // Check if there are posts to display
          : mostPosts.results.length ? (
            <>
              <p className={`text-center p-2 ${styles.Header} ${navStyles.Logo}`}>
                Top
                {' '}
                <span>Creators</span>
              </p>
              {/* Render profiles based on screen size */}
              {mobile ? (
              // Mobile view
                <div className="d-flex justify-content-around">
                  {mostPosts.results.slice(0, 3).map((profile) => (
                    <Profile key={profile.id} profile={profile} mobile />
                  ))}
                </div>
              ) : (
                // Desktop view
                mostPosts.results.slice(0, 3).map((profile) => (
                  <Profile key={profile.id} profile={profile} />
                ))
              )}
            </>
          ) : (
          // Show a spinner if there are no top creators yet
            <Asset spinner />
          )}
      </Container>
    </>
  );
};

export default PopularProfilesMostPosts;
