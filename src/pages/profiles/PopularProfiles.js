import React, { useEffect, useState } from 'react'

import styles from "../../styles/PopularProfiles.module.css"
import { Container } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

const PopularProfiles = () => {

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
    <Container className={`mt-2 p-3 ${styles.Container}`}>
        <p>Popular Profiles</p>
        {popularProfiles.results.map(profile => (
            <p key={profile.id}>{profile.owner}</p>
        ))}
    </Container>
  )
}

export default PopularProfiles