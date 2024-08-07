import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/Dropdown.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
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
