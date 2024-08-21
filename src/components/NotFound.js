import React from 'react'
import NoResults from "../assets/no-results.jpg"
import Asset from './Asset'
import PopularProfilesMostPosts from '../pages/profiles/PopularProfilesMostPosts'
import { Button, Col, Container, Row } from 'react-bootstrap'
import PopularPosts from '../pages/posts/PopularPosts'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import btnStyles from "../styles/Button.module.css"

const NotFound = () => {

    return (
        <Row className="h-100">
          <Col lg={8} className="py-2 p-0 p-lg-2">
          <PopularProfilesMostPosts mobile />
            <Container className="mt-3">
              <Asset message="We are sorry, but the page you were looking for can't be found!" src={NoResults} alt="Not Found" height={200} width={200} borderRadius="10px"/>
              <div className="text-center">
                <Link to='/'>
                    <Button className={btnStyles.Button}>
                        Go To Home
                    </Button>
                </Link>
              </div>
            </Container>
          </Col>
    
          <Col lg={4} className="d-none d-lg-flex flex-column p-lg-2">
            <div className="d-lg-none mb-3">
              <PopularProfilesMostPosts />
            </div>
            <div className="d-none d-lg-flex flex-column">
              <PopularProfilesMostPosts />
              <PopularPosts />
            </div> 
          </Col>
        </Row>
      );

}

export default NotFound