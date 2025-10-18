"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button, Form, InputGroup } from "react-bootstrap";
import { BsGripVertical, BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { LiaBookSolid } from "react-icons/lia";
import { FaCaretDown } from "react-icons/fa";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as db from "../../../Database";
import "./assignments.css";

type Assignment = {
  _id: string;
  course: string;
  title: string;
  available: string;
  due: string;
  points: number;
};

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const assignments = (db.assignments as Assignment[]).filter(
    (a) => a.course === String(cid)
  );

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div style={{ maxWidth: 340 }} className="w-100">
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <FaSearch className="text-secondary" />
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Search..." id="wd-search-assignments" />
          </InputGroup>
        </div>
        <div className="ms-3 flex-shrink-0">
          <Button variant="secondary" className="me-2 group-btn" id="wd-add-group">
            + Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            + Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray w-100">
          <div
            className="wd-title wd-assn-header px-3 py-2 d-flex justify-content-between align-items-center border-bottom"
          >
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-5 text-muted" />
              <FaCaretDown className="me-2" />
              <span className="fw-semibold text-uppercase">ASSIGNMENTS</span>
            </span>
            <div className="d-flex align-items-center">
              <span className="wd-weight-pill me-2">40% of Total</span>
              <BsPlus className="fs-4 me-2 text-secondary" />
              <BsThreeDotsVertical className="fs-5 text-secondary" />
            </div>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((a) => (
              <ListGroupItem
                key={a._id}
                className="wd-lesson wd-left-accent py-3 ps-0 pe-3 d-flex align-items-start justify-content-between border-0 border-bottom"
              >
                <div className="d-flex align-items-start w-100">
                  <div className="px-3 pt-1">
                    <BsGripVertical className="me-2 fs-5 text-muted" />
                    <LiaBookSolid className="me-2 fs-4 text-success" />
                  </div>
                  <div className="flex-grow-1">
                    <Link
                      href={`/Courses/${cid}/Assignments/${a._id}`}
                      className="fw-semibold text-dark text-decoration-none fs-5"
                    >
                      {a.title}
                    </Link>
                    <div className="text-muted small mt-1">
                      <span className="text-danger">Multiple Modules</span>
                      <span className="mx-2 text-muted">|</span>
                      <b>Not available until</b> {a.available} |
                    </div>
                    <div className="text-muted small">
                      <b>Due</b> {a.due}
                      <span className="mx-2 text-muted">|</span>
                      {a.points} pts
                    </div>
                  </div>
                </div>
                <AssignmentControlButtons />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
