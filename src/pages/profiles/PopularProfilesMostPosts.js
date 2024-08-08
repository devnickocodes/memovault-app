import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import Asset from '../../components/Asset';
import Profile from './Profile';
import navStyles from "../../styles/NavBar.module.css";
import styles from "../../styles/PopularProfiles.module.css";
import { useProfileData } from '../../contexts/ProfileDataContext';

const PopularProfilesMostPosts = ({ mobile }) => {
    const { profileData, popularProfilesError, mostPostsError } = useProfileData();
    const { popularProfiles, mostPosts } = profileData;

    return (
        <>
            <Container className={`${styles.Container} mb-3 ${mobile && 'd-lg-none text-center mb-2'}`}>
                {popularProfilesError ? (
                    <p>{popularProfilesError}</p>
                ) :
                popularProfiles.results.length ? (
                    <>
                        <p className={`text-center p-2 ${styles.Header} ${navStyles.Logo}`}>Popular <span>Profiles</span></p>
                        {mobile ? (
                            <div className="d-flex justify-content-around">
                                {popularProfiles.results.slice(0, 3).map(profile => (
                                    <Profile key={profile.id} profile={profile} mobile />
                                ))}
                            </div>
                        ) : (
                            popularProfiles.results.slice(0, 3).map(profile => (
                                <Profile key={profile.id} profile={profile} />
                            ))
                        )}
                    </>
                ) : (
                    <Asset spinner />
                )}
            </Container>


            <Container className={`${styles.Container} ${mobile && 'd-lg-none text-center mb-2'}`}>
                {mostPostsError ? (
                    <p>
                    {mostPostsError}
                </p>
                ) : 
                mostPosts.results.length ? (
                    <>
                        <p className={`text-center p-2 ${styles.Header} ${navStyles.Logo}`}>Top <span>Creators</span></p>
                        {mobile ? (
                            <div className="d-flex justify-content-around">
                                {mostPosts.results.slice(0, 3).map(profile => (
                                    <Profile key={profile.id} profile={profile} mobile />
                                ))}
                            </div>
                        ) : (
                            mostPosts.results.slice(0, 3).map(profile => (
                                <Profile key={profile.id} profile={profile} />
                            ))
                        )}
                    </>
                ) : (
                    <Asset spinner />
                )}
            </Container>
        </>
    );
};

export default PopularProfilesMostPosts;
