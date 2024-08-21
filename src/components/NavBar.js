import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Alert } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import ConfirmationModal from "../utils/ConfirmationModal";
import postStyles from "../styles/Post.module.css"
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp()
    } catch (err) {
      setError("Sorry an error occurred, please try again.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 2000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  const addPostIcon = (
    <NavLink
      className={`${styles.NavLink} ${styles.addPostIcon}`}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="fa-solid fa-circle-plus mr-1"></i>Add Post
    </NavLink>
  );

  const dropdownAddPostIcon = (
    <NavLink
      className={`${styles.NavLink} ${styles.dropdownAddPostIcon}`}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="fa-solid fa-circle-plus mr-1"></i>Add Post
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fa-solid fa-bars-staggered mr-2"></i>Feed
      </NavLink>

      {currentUser?.is_admin ? (
        <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/reports/admin"
      >
        <i className="fa-solid fa-flag mr-2"></i>Reports
      </NavLink>
      ): (
        <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/reports"
      >
        <i className="fa-solid fa-flag mr-2"></i>Reports
      </NavLink>
      )}

      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={() => {}}
      >
        <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={32} />
      </NavLink>

      <NavLink className={styles.NavLink} to="/" onClick={() => setShowDeleteModal(true)}>
        <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>Sign Out
      </NavLink>
    </>
  );

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
    <>
      <Navbar expanded={expanded} className={styles.navContainer} expand="md" fixed="top">
        <Container>
          <NavLink className={styles.LogoLink} to="/">
            <Navbar.Brand className={styles.Logo}>
              Memo<span>Vault</span>
              <i className="fa-solid fa-icons ml-3"></i>
            </Navbar.Brand>
          </NavLink>
          {currentUser && addPostIcon}
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
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
              {currentUser && dropdownAddPostIcon}
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {error && (
        <Alert className={postStyles.Alert}>
          {error}
        </Alert>
      )}
      <ConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleSignOut}
        title="Sign Out?"
        message="Are you sure you want to sign out?"
      />
    </>
  );
};

export default NavBar;
