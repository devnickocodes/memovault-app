import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/NavBar.module.css';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import ConfirmationModal from '../utils/ConfirmationModal';
import postStyles from '../styles/Post.module.css';
import { removeTokenTimestamp } from '../utils/utils';
import { useSuccessAlert } from '../contexts/SuccessAlertContext';

/**
 * The NavBar component renders a responsive navigation bar that adapts
 * based on the user's authentication status.
 *
 * - Displays application logo and links to the home page.
 * - Shows navigation options such as "Feed", "Reports", "Profile", and "Add Post"
 * when the user is logged in.
 * - Provides sign-out functionality with a confirmation modal.
 * - Displays different links for users who are logged in vs. logged out.
 * - Manages error and success alerts for user feedback.
 */
const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(null);
  const { alert, setAlert } = useSuccessAlert();

  // Handle user sign-out by making an API request and updating the application state
  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
      setAlert({ message: `Sorry to see you go ${currentUser.username}!` });
    } catch (err) {
      // console.log(err)
      setError('Sorry an error occurred, please try again.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Clear error messages after a timeout
  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(null), 2000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  // Icon and link for adding a new post
  const addPostIcon = (
    <NavLink
      className={`${styles.NavLink} ${styles.addPostIcon}`}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="fa-solid fa-circle-plus mr-1" />
      Add Post
    </NavLink>
  );

  // Icon and link for adding a new post in dropdown menu
  const dropdownAddPostIcon = (
    <NavLink
      className={`${styles.NavLink} ${styles.dropdownAddPostIcon}`}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="fa-solid fa-circle-plus mr-1" />
      Add Post
    </NavLink>
  );

  // Navigation links shown to logged-in users
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fa-solid fa-bars-staggered mr-2" />
        Feed
      </NavLink>

      {/* Conditionally render Reports link based on admin status */}
      {currentUser?.is_admin ? (
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/reports/admin"
        >
          <i className="fa-solid fa-flag mr-2" />
          Reports
        </NavLink>
      ) : (
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/reports"
        >
          <i className="fa-solid fa-flag mr-2" />
          Reports
        </NavLink>
      )}

      {/* Profile link with avatar */}
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={() => {}}
      >
        <Avatar
          src={currentUser?.profile_image}
          text={currentUser?.username}
          height={32}
        />
      </NavLink>

      {/* Sign out link triggers the confirmation modal */}
      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={() => setShowDeleteModal(true)}
      >
        <i className="fa-solid fa-arrow-right-from-bracket mr-2" />
        Sign Out
      </NavLink>
    </>
  );

  // Navigation links shown to logged-out users
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fa-solid fa-right-to-bracket mr-1" />
        Sign In
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-solid fa-user-plus mr-1" />
        Sign Up
      </NavLink>
    </>
  );

  return (
    <>
      {/* Navbar component from react-bootstrap */}
      <Navbar
        expanded={expanded}
        className={styles.navContainer}
        expand="md"
        fixed="top"
      >
        <Container>
          {/* Logo and link to the home page */}
          <NavLink className={styles.LogoLink} to="/">
            <Navbar.Brand>
              <h1 className={styles.Logo}>
                Memo
                <span>Vault</span>
                <i className="fa-solid fa-icons ml-3" />
              </h1>
            </Navbar.Brand>
          </NavLink>
          {/* Show add post icon if user is logged in */}
          {currentUser && addPostIcon}
          {/* Navbar toggle button for collapsing/expanding the menu */}
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          {/* Navbar collapsible menu */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* Home link */}
              <NavLink
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/"
              >
                <i className="fa-solid fa-house mr-1" />
                Home
              </NavLink>
              {/* Show add post icon in dropdown menu if user is logged in */}
              {currentUser && dropdownAddPostIcon}
              {/* Show different navigation links based on user authentication status */}
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Display error alert if there is an error */}
      {error && (
        <Alert className={`${postStyles.Alert} ${postStyles.ErrorAlert}`}>
          {error}
        </Alert>
      )}
      {/* Display success alert if there is a success message */}
      {alert?.message && (
        <Alert className={`${postStyles.Alert} ${postStyles.SuccessAlert}`}>
          {alert.message}
        </Alert>
      )}
      {/* Confirmation modal for sign-out */}
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
