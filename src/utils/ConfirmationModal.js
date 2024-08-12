import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import btnStyles from "../styles/Button.module.css"

const ConfirmationModal = ({ show, handleClose, handleConfirm, title, message, optionalMessage }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Body className='text-muted'>{optionalMessage}</Modal.Body>
      <Modal.Footer>
        <Button className={`${btnStyles.GreyButton}`} onClick={handleClose}>
          Cancel
        </Button>
        <Button className={`${btnStyles.Button}`} onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
