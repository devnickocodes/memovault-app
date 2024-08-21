import React from "react";
import Dropdown from "react-bootstrap/Dropdown"; 
import styles from "../styles/Dropdown.module.css";
import { useHistory } from "react-router-dom";


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

export const DropdownOptions = ({ isAdmin, handleEdit, handleDelete }) => {
  return (
    <Dropdown className={`ml-2 ${styles.Dropdown}`} drop="left">
      <Dropdown.Toggle as={GearToggle} />
      <Dropdown.Menu popperConfig={{ strategy: "fixed" }} className="text-center">
        {!isAdmin && (
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleEdit}
            aria-label="edit"
          >
            <i className={`fa-regular fa-pen-to-square ${styles.Grey}`}></i>
          </Dropdown.Item>
        )}
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

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Dropdown}`} drop="left">
      <Dropdown.Toggle as={GearToggle} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />
          change username
        </Dropdown.Item>
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