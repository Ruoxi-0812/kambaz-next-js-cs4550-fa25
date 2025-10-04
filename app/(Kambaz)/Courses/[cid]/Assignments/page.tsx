"use client";

import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { BsGripVertical, BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { LiaBookSolid } from "react-icons/lia";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div style={{ maxWidth: 340 }} className="w-100">
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <FaSearch className="text-secondary" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search..."
              id="wd-search-assignments"
            />
          </InputGroup>
        </div>
        <div className="ms-3 flex-shrink-0">
          <Button variant="secondary" className="me-2" id="wd-add-group">
            + Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            + Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
          <div className="wd-title px-3 py-2 bg-secondary-subtle d-flex justify-content-between align-items-center border-bottom">
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-5 text-muted" />
              <span className="fw-semibold text-uppercase">ASSIGNMENTS</span>
            </span>
            <div className="d-flex align-items-center">
              <span className="badge rounded-pill text-bg-light border me-2">
                40% of Total
              </span>
              <BsPlus className="fs-4 me-2 text-secondary" />
              <BsThreeDotsVertical className="fs-5 text-secondary" />
            </div>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {/* A1 */}
            <ListGroupItem
              className="wd-lesson py-3 ps-0 pe-3 d-flex align-items-start justify-content-between border-0 border-bottom"
              style={{ borderLeft: "6px solid #198754" }}
            >
              <div className="d-flex align-items-start w-100">
                <div className="px-3 pt-1">
                  <BsGripVertical className="me-2 fs-5 text-muted" />
                  <LiaBookSolid className="me-2 fs-4 text-success" />
                </div>
                <div className="flex-grow-1">
                  <Link
                    href="/Courses/1234/Assignments/a1"
                    className="fw-semibold text-dark text-decoration-none fs-5"
                  >
                    A1
                  </Link>
                  <div className="text-muted small mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2 text-muted">|</span>
                    <b>Not available until</b> May 6 at 12:00am |
                  </div>
                  <div className="text-muted small">
                    <b>Due</b> May 13 at 11:59pm
                    <span className="mx-2 text-muted">|</span>
                    100 pts
                  </div>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>

            {/* A2 */}
            <ListGroupItem
              className="wd-lesson py-3 ps-0 pe-3 d-flex align-items-start justify-content-between border-0 border-bottom"
              style={{ borderLeft: "6px solid #198754" }}
            >
              <div className="d-flex align-items-start w-100">
                <div className="px-3 pt-1">
                  <BsGripVertical className="me-2 fs-5 text-muted" />
                  <LiaBookSolid className="me-2 fs-4 text-success" />
                </div>
                <div className="flex-grow-1">
                  <Link
                    href="/Courses/1234/Assignments/a2"
                    className="fw-semibold text-dark text-decoration-none fs-5"
                  >
                    A2
                  </Link>
                  <div className="text-muted small mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2 text-muted">|</span>
                    <b>Not available until</b> May 13 at 12:00am |
                  </div>
                  <div className="text-muted small">
                    <b>Due</b> May 20 at 11:59pm
                    <span className="mx-2 text-muted">|</span>
                    100 pts
                  </div>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>

            {/* A3 */}
            <ListGroupItem
              className="wd-lesson py-3 ps-0 pe-3 d-flex align-items-start justify-content-between border-0"
              style={{ borderLeft: "6px solid #198754" }}
            >
              <div className="d-flex align-items-start w-100">
                <div className="px-3 pt-1">
                  <BsGripVertical className="me-2 fs-5 text-muted" />
                  <LiaBookSolid className="me-2 fs-4 text-success" />
                </div>
                <div className="flex-grow-1">
                  <Link
                    href="/Courses/1234/Assignments/a3"
                    className="fw-semibold text-dark text-decoration-none fs-5"
                  >
                    A3
                  </Link>
                  <div className="text-muted small mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2 text-muted">|</span>
                    <b>Not available until</b> May 20 at 12:00am |
                  </div>
                  <div className="text-muted small">
                    <b>Due</b> May 27 at 11:59pm
                    <span className="mx-2 text-muted">|</span>
                    100 pts
                  </div>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
