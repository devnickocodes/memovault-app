import React from 'react';
import NoResults from "../assets/no-results.jpg";
import Asset from './Asset';
import PopularProfilesMostPosts from '../pages/profiles/PopularProfilesMostPosts';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PopularPosts from '../pages/posts/PopularPosts';
import { Link } from 'react-router-dom';
import btnStyles from "../styles/Button.module.css";

/**
 * NotFound component displayed when a page is not found.
 * It also displays popular profiles and posts based on the viewport size.
 */
const NotFound = () => {
    return (
        <Row className="h-100">
          <Col lg={8} className="py-2 p-0 p-lg-2">
            {/* Render popular profiles section for mobile view */}
            <PopularProfilesMostPosts mobile />
            <Container className="mt-3">
              {/* Display a no results image and a message */}
              <Asset 
                message="We are sorry, but the page you were looking for can't be found!" 
                src={NoResults} 
                alt="Not Found" 
                height={200} 
                width={200} 
                borderRadius="10px"
              />
              <div className="text-center">
                {/* Button to navigate back to the home page */}
                <Link to='/'>
                    <Button className={btnStyles.Button}>
                        Go To Home
                    </Button>
                </Link>
              </div>
            </Container>
          </Col>
    
          <Col lg={4} className="d-none d-lg-flex flex-column p-lg-2">
            {/* Render popular profiles section for larger screens */}
            <div className="d-lg-none mb-3">
              <PopularProfilesMostPosts />
            </div>
            <div className="d-none d-lg-flex flex-column">
              {/* Display popular profiles and posts for larger screens */}
              <PopularProfilesMostPosts />
              <PopularPosts />
            </div> 
          </Col>
        </Row>
      );
}

export default NotFound;
