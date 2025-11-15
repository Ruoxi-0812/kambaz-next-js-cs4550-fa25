"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaCaretDown } from "react-icons/fa";
import { LiaBookSolid } from "react-icons/lia";
import AssignmentControlButtons from "../Assignments/AssignmentControlButtons";
import "./assignments.css";
import AssignmentChange from "./AssignmentAdd";
import {
  deleteAssignmentInState,
  setAssignments,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import type { Assignment } from "./reducer";
import * as client from "./client";
import type { RootState } from "../../../store";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [assignment, setAssignment] = useState<Assignment>({
    _id: "",
    course: String(cid),
    title: "",
    description: "",
    points: 100,
    due: "",
    availableFrom: "",
    availableUntil: "",
  });

  const [showDelete, setShowDelete] = useState(false);
  const [toDelete, setToDelete] = useState<Assignment | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!cid) return;
      try {
        const data = await client.fetchAssignmentsForCourse(String(cid));
        dispatch(setAssignments(data));
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [cid, dispatch]);

  const addNewAssignment = async () => {
    if (!cid) return;
    try {
      const created = await client.createAssignmentForCourse(String(cid), {
        _id: "", 
        course: String(cid),
        title: assignment.title,
        description: assignment.description,
        points: assignment.points,
        due: assignment.due,
        availableFrom: assignment.availableFrom,
        availableUntil: assignment.availableUntil,
      });
      dispatch(setAssignments([...assignments, created]));
      setAssignment({
        _id: "",
        course: String(cid),
        title: "",
        description: "",
        points: 100,
        due: "",
        availableFrom: "",
        availableUntil: "",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div style={{ maxWidth: 340 }} className="w-100">
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <FaSearch className="text-secondary" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search..."
              id="wd-search-assignments"
              className="border-start-0"
            />
          </InputGroup>
        </div>
        <div className="ms-3 flex-shrink-0">
          <Button
            variant="secondary"
            className="me-2 group-btn"
            id="wd-add-group"
          >
            + Group
          </Button>
          <Button
            variant="danger"
            id="wd-add-assignment"
            onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
          >
            + Assignment
          </Button>
        </div>
      </div>

      <AssignmentChange
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Assignment"
        assignment={assignment}
        setAssignment={setAssignment}
        addAssignment={addNewAssignment}
      />

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{toDelete?.title}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              if (toDelete?._id) {
                try {
                  await client.deleteAssignment(toDelete._id);
                  dispatch(deleteAssignmentInState(toDelete._id));
                } catch (e) {
                  console.error(e);
                }
              }
              setShowDelete(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
      <ListGroup className="rounded-0 shadow-sm">
        <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
          <div className="wd-title wd-assn-header px-3 py-3 d-flex justify-content-between align-items-center border-bottom">
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-5 text-muted" />
              <FaCaretDown className="me-2" />
              <span className="fw-semibold text-uppercase">Assignments</span>
            </span>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((a) => a.course === cid)
              .map((a) => (
                <ListGroupItem
                  key={a._id}
                  className="wd-lesson wd-left-accent py-3 ps-0 pe-3 border-0 border-bottom"
                >
                  <div className="d-flex align-items-start w-100">
                    <div className="px-3 pt-1">
                      <BsGripVertical className="me-2 fs-5 text-muted" />
                      <LiaBookSolid className="me-2 fs-4 text-success" />
                    </div>

                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <Link
                          href={`/Courses/${cid}/Assignments/${a._id}`}
                          className="fw-semibold text-dark text-decoration-none fs-5"
                        >
                          {a.title?.trim() || "(Untitled)"}
                        </Link>

                        <div className="ms-2 d-flex align-items-center">
                          <AssignmentControlButtons
                            assignmentId={a._id}
                            deleteAssignment={() => {
                              setToDelete(a);
                              setShowDelete(true);
                            }}
                            onEdit={(id) =>
                              router.push(`/Courses/${cid}/Assignments/${id}`)
                            }
                          />
                        </div>
                      </div>

                      {a.description && (
                        <div className="text-muted small mt-1">
                          {a.description}
                        </div>
                      )}
                      <div className="text-muted small mt-1">
                        {a.availableFrom && (
                          <>
                            <b>Available From:</b> {a.availableFrom}
                            <span className="mx-1 text-muted">|</span>
                          </>
                        )}
                        {a.availableUntil && (
                          <>
                            <b>Until:</b> {a.availableUntil}
                            <span className="mx-1 text-muted">|</span>
                          </>
                        )}
                        <b>Due:</b> {a.due || a.dueDate || "—"}
                        <span className="mx-1 text-muted">|</span>
                        {a.points} pts
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
