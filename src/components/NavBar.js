import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top">
      <Container>
        <Navbar.Brand>MemoVault</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home"><i className="fa-solid fa-house"></i>Home</Nav.Link>
            <Nav.Link><i className="fa-solid fa-right-to-bracket"></i>Sign In</Nav.Link>
            <Nav.Link><i className="fa-solid fa-user-plus"></i>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
