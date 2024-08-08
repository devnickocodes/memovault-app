import React, { useEffect, useState } from 'react'

import styles from "../../styles/PopularProfiles.module.css"
import { Container } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import Asset from '../../components/Asset'
import Profile from './Profile'
import navStyles from "../../styles/NavBar.module.css"

const PopularProfiles = ({mobile}) => {

    const [profileData, setProfileData] = useState({
        pageProfile: {results: []},
        popularProfiles: {results: []},
        mostPosts: {results: []}
    })
    const {popularProfiles, mostPosts} = profileData
    const currentUser = useCurrentUser()

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data: followersData } = await axiosReq.get('/profiles/?ordering=-followers_count');
                const { data: postsData } = await axiosReq.get('/profiles/?ordering=-posts_count');
                setProfileData(prevState => ({
                    ...prevState,
                    popularProfiles: followersData,
                    mostPosts: postsData
                }))
            } catch(err) {
                console.log(err)
            }
        }
        handleMount()
    }, [currentUser])

  return (
    <>
    <Container className={`${styles.Container} mb-3 ${mobile && 'd-lg-none text-center mb-2'}`}>
        {popularProfiles.results.length ? (
        <>
        <p className={`text-center p-2 ${styles.Header} ${navStyles.Logo}`}>Popular <span>Profiles</span></p>
        {mobile ? (
            <div className="d-flex justify-content-around">
                {popularProfiles.results.slice(0, 3).map(profile => (
                <Profile key={profile.id} profile={profile} mobile />
                ))}
            </div>
        ): (
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
        {mostPosts.results.length ? (
        <>
        <p className={`text-center p-2 ${styles.Header} ${navStyles.Logo}`}>Top <span>Creators</span></p>
        {mobile ? (
            <div className="d-flex justify-content-around">
                {mostPosts.results.slice(0, 3).map(profile => (
                <Profile key={profile.id} profile={profile} mobile />
                ))}
            </div>
        ): (
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
  )
}

export default PopularProfiles