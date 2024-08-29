import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import btnStyles from '../styles/Button.module.css';

/**
 * ConfirmationModal is a reusable modal component that provides a confirmation dialog.
 * It prompts the user with a message and offers them the choice to confirm or cancel an action.
 */
const ConfirmationModal = ({
  show, handleClose, handleConfirm, title, message, optionalMessage,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    {optionalMessage && (
    <Modal.Body className="text-muted">{optionalMessage}</Modal.Body>
    )}
    <Modal.Footer>
      {/* Cancel button to close the modal without taking action */}
      <Button className={`${btnStyles.Button} ${btnStyles.GreyButton}`} onClick={handleClose}>
        Cancel
      </Button>
      {/* Confirm button to trigger the confirmation action */}
      <Button className={`${btnStyles.Button}`} onClick={handleConfirm}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmationModal;
