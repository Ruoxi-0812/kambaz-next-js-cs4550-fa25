"use client";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmDeleteModal({
  show,
  onClose,
  onConfirm,
  itemName,
}: {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Remove Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove
        {itemName ? ` “${itemName}”` : " this assignment"}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
