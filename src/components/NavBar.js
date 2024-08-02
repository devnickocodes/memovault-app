import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Navbar className={styles.navContainer} expand="md" fixed="top">
      <Container>
        <Navbar.Brand className={styles.Logo}>Memo<span>Vault</span><i className="fa-solid fa-icons ml-3"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home"><i className="fa-solid fa-house mr-1"></i>Home</Nav.Link>
            <Nav.Link><i className="fa-solid fa-right-to-bracket mr-1"></i>Sign In</Nav.Link>
            <Nav.Link><i className="fa-solid fa-user-plus mr-1"></i>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
