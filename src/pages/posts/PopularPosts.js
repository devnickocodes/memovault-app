import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import styles from "../../styles/PopularProfiles.module.css";
import navStyles from "../../styles/NavBar.module.css"



const PopularPosts = () => {

  const [postData, setPostData] = useState({
    popularPosts: {results: []}
  })

  const {popularPosts} = postData

  return (
    <Container className={`mt-3 ${styles.Container}`}>
      <p className={`text-center p-2 ${styles.Header} ${navStyles.Logo}`}>Popular <span>Posts</span></p>
    </Container>
  )
}

export default PopularPosts