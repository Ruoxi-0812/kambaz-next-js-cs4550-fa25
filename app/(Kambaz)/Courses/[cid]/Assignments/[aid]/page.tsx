"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import type { RootState, AppDispatch } from "../../../../store";
import {
  addAssignment,
  updateAssignment,
  type Assignment,
} from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const all = useSelector((s: RootState) => s.assignmentsReducer.assignments);
  const existing = useMemo(
    () => all.find((x) => x._id === aid && x.course === cid),
    [all, aid, cid]
  );

  const isNew = aid === "new";

  const [title, setTitle] = useState<string>(existing?.title ?? "New Assignment");
  const [description, setDescription] = useState<string>(existing?.description ?? "New Assignment Description");
  const [points, setPoints] = useState<number>(existing?.points ?? 100);
  const [dueISO, setDueISO] = useState<string>(existing?.dueISO ?? "");
  const [availableISO, setAvailableISO] = useState<string>(existing?.availableISO ?? "");
  const [untilISO, setUntilISO] = useState<string>(existing?.untilISO ?? "");

  const save = () => {
    if (isNew) {
      dispatch(
        addAssignment({
          course: String(cid),
          title,
          description,
          points,
          dueISO,
          availableISO,
          untilISO,
        })
      );
    } else if (existing) {
      const updated: Assignment = {
        ...existing,
        title,
        description,
        points,
        dueISO,
        availableISO,
        untilISO,
      };
      dispatch(updateAssignment(updated));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <FormGroup className="mb-3" controlId="wd-name">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormGroup>

        <FormGroup className="mb-3" controlId="wd-description">
          <FormLabel>Description</FormLabel>
          <FormControl as="textarea" rows={10} value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-points">
          <FormLabel column sm={2}>Points</FormLabel>
          <Col sm={4}>
            <FormControl
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-group">
          <FormLabel column sm={2}>Assignment Group</FormLabel>
          <Col sm={4}>
            <FormSelect defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </FormSelect>
          </Col>
        </FormGroup>

        <Card className="mb-3">
          <Card.Body>
            <FormGroup className="mb-3" controlId="wd-submission-type">
              <FormLabel>Submission Type</FormLabel>
              <FormSelect defaultValue="Online">
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="No submission">No submission</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>Online Entry Options</FormLabel>
              <div>
                <Form.Check type="checkbox" label="Text Entry" />
                <Form.Check type="checkbox" label="Website URL" defaultChecked />
                <Form.Check type="checkbox" label="Media Recordings" />
                <Form.Check type="checkbox" label="Student Annotation" />
                <Form.Check type="checkbox" label="File Uploads" />
              </div>
            </FormGroup>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Row className="mb-3">
              <Col sm={4}>
                <FormGroup controlId="wd-due-date">
                  <FormLabel>Due</FormLabel>
                  <FormControl type="date" value={dueISO} onChange={(e) => setDueISO(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4}>
                <FormGroup controlId="wd-available-from">
                  <FormLabel>Available from</FormLabel>
                  <FormControl
                    type="date"
                    value={availableISO}
                    onChange={(e) => setAvailableISO(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup controlId="wd-available-until">
                  <FormLabel>Until</FormLabel>
                  <FormControl type="date" value={untilISO} onChange={(e) => setUntilISO(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="mt-4 d-flex justify-content-end">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <Button className="btn btn-danger" onClick={save}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
