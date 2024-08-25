import React from "react";
import Dropdown from "react-bootstrap/Dropdown"; 
import styles from "../styles/Dropdown.module.css";
import { useHistory } from "react-router-dom";

/**
 * Custom gear icon used for dropdown toggling.
 * 
 * This component renders a gear icon that triggers a dropdown menu when clicked.
 * It uses `React.forwardRef` to forward the ref to the icon element.
 */
const GearToggle = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-gear"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

/**
 * DropdownOptions component for displaying edit and delete options.
 * 
 * This component renders a dropdown menu with options for editing and deleting content. 
 * The visibility of the edit option depends on the `isAdmin` prop.
 * 
 * If `isAdmin` is false, the edit option is displayed; otherwise, only the delete option is shown.
 */
export const DropdownOptions = ({ isAdmin, handleEdit, handleDelete }) => {
  return (
    <Dropdown className={`ml-2 ${styles.Dropdown}`} drop="left">
      <Dropdown.Toggle as={GearToggle} />
      <Dropdown.Menu popperConfig={{ strategy: "fixed" }} className="text-center">
        {/* Display the edit option if not an admin */}
        {!isAdmin && (
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleEdit}
            aria-label="edit"
          >
            <i className={`fa-regular fa-pen-to-square ${styles.Grey}`}></i>
          </Dropdown.Item>
        )}
        {/* Always display the delete option */}
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className={`fa-regular fa-trash-can ${styles.Red}`}></i>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

/**
 * ProfileEditDropdown component for profile-related actions.
 * 
 * This component renders a dropdown menu with options for editing the profile, username, and password. 
 * It uses React Router's `useHistory` hook to navigate to the appropriate routes based on the user's selection.
 * 
 * The `id` prop is used to construct the navigation paths for editing different parts of the profile.
 */
export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Dropdown}`} drop="left">
      <Dropdown.Toggle as={GearToggle} />
      <Dropdown.Menu>
        {/* Navigate to profile edit page */}
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> edit profile
        </Dropdown.Item>
        {/* Navigate to edit username page */}
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />
          change username
        </Dropdown.Item>
        {/* Navigate to edit password page */}
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
