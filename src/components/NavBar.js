import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser()

  const {expanded, setExpanded, ref} = useClickOutsideToggle()

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/')
      setCurrentUser(null)
    } catch (err) {
      console.log(err)
    }
  }

  const addPostIcon = (
    <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/posts/create"
  >
    <i className="fa-solid fa-circle-plus mr-2"></i>Add Post
  </NavLink>
  )

  const loggedInIcons = <>
    <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/feed"
  >
    <i className="fa-solid fa-bars-staggered mr-2"></i>Feed
  </NavLink>

  <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/reports"
  >
    <i className="fa-solid fa-flag mr-2"></i>Reports
  </NavLink>

  <NavLink
    className={styles.NavLink}
    to={`/profiles/${currentUser?.profile_id}`}
    onClick={()=> {}}
  >
    <Avatar src={currentUser?.profile_image} text='Profile' height={32} />
  </NavLink>

  <NavLink
    className={styles.NavLink}
    to="/"
    onClick={handleSignOut}
  >
    <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>Sign Out
  </NavLink>
  </>

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fa-solid fa-right-to-bracket mr-1"></i>Sign In
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-solid fa-user-plus mr-1"></i>Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} className={styles.navContainer} expand="md" fixed="top">
      <Container>
        <NavLink className={styles.LogoLink} to="/">
          <Navbar.Brand className={styles.Logo}>
            Memo<span>Vault</span>
            <i className="fa-solid fa-icons ml-3"></i>
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fa-solid fa-house mr-1"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
