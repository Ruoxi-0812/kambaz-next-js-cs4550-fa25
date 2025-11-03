"use client";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

function AssignmentControlButtons({
  onDelete,
  onEdit,
  title,
}: {
  onDelete: () => void;
  onEdit?: () => void;
  title?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="d-flex align-items-center">
        {onEdit && (
          <Button
            variant="outline-primary"
            size="sm"
            className="me-2"
            onClick={onEdit}
          >
            Edit
          </Button>
        )}
        <Button
          variant="outline-danger"
          size="sm"
          className="me-2"
          onClick={() => setShow(true)}
        >
          Delete
        </Button>
        <BsThreeDotsVertical className="fs-5 text-secondary" />
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{title ? ` “${title}”` : " this assignment"}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onDelete();
              setShow(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AssignmentControlButtons;
