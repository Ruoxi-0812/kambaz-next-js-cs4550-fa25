"use client";

import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTrash, FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function AssignmentControlButtons({
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
      <div className="d-flex align-items-center justify-content-end gap-2">
        {onEdit && (
          <FaPencil
            onClick={onEdit}
            className="text-primary"
            role="button"
            title="Edit"
            style={{ fontSize: "1.3rem" }}
          />
        )}

        <FaTrash
          className="text-danger"
          role="button"
          title="Delete"
          style={{ fontSize: "1.3rem" }}
          onClick={() => setShow(true)}
        />

        <span style={{ position: "relative", top: "0px" }}>
          <GreenCheckmark />
        </span>
        <IoEllipsisVertical className="fs-4 text-secondary" role="button" />
      </div>
      
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          {title ? ` “${title}”` : " this assignment"}?
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
