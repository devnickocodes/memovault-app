import React from 'react'

import styles from "../../styles/PopularProfiles.module.css"
import { Container } from 'react-bootstrap'

const PopularProfiles = () => {
  return (
    <Container className={`mt-2 p-3 ${styles.Container}`}>
        <p>Popular Profiles</p>
    </Container>
  )
}

export default PopularProfiles