import React from 'react'
import styles from "../../styles/PopularPost.module.css"
import { Card, Container } from 'react-bootstrap'
import Asset from '../../components/Asset'
import Avatar from '../../components/Avatar'
import { Link } from 'react-router-dom'

const PopularPost = (props) => {
  
    const {post} = props
    const {id, owner, profile_id, profile_image, title, content, image, post_likes_count } = post

  return (
    <Container className='p-2'>
    <Card>
      <Card.Header className='text-center'>{title}</Card.Header>
      <Card.Img src={image} />
    <Card.Body>
      <Card.Title> Card Title </Card.Title>
      <Card.Text>
        {content}
      </Card.Text>
    </Card.Body>
  </Card>
    </Container>
  )
}

export default PopularPost