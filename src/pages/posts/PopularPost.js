import React from 'react'
import styles from "../../styles/PopularPost.module.css"

const PopularPost = (props) => {

    const {post} = props
    const {id, owner, profile_id, profile_image, title, content, image, post_likes_count } = post

  return (
    <div>{title}</div>
  )
}

export default PopularPost