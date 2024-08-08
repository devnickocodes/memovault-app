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
        popularProfiles: {results: []}
    })
    const {popularProfiles} = profileData
    const currentUser = useCurrentUser()

    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(
                    '/profiles/?ordering=-followers_count'
                );
                setProfileData(prevState => ({
                    ...prevState,
                    popularProfiles: data,
                }))
            } catch(err) {
                console.log(err)
            }
        }
        handleMount()
    }, [currentUser])

  return (
    <Container className={`${styles.Container} ${mobile && 'd-lg-none text-center mb-2'}`}>
        {popularProfiles.results.length ? (
        <>
        <p className={`text-center p-2 ${styles.Header} ${navStyles.Logo}`}>Popular <span>Profiles</span></p>
        {mobile ? (
            <div className="d-flex justify-content-around">
                {popularProfiles.results.slice(0, 4).map(profile => (
                <Profile key={profile.id} profile={profile} mobile />
                ))}
            </div>
        ): (
            popularProfiles.results.slice(0, 4).map(profile => (
                <Profile key={profile.id} profile={profile} />
                ))
        )}
            </>
        ) : (
            <Asset spinner />
        )}
    </Container>
  )
}

export default PopularProfiles