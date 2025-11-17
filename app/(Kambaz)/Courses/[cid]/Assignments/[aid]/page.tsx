"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments } from "../reducer";
import { useState, useEffect } from "react";
import * as client from "../client";
import type { RootState } from "../../../../store";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormCheck from "react-bootstrap/FormCheck";
import FormSelect from "react-bootstrap/FormSelect";

import type { Assignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: { assignmentsReducer: { assignments: Assignment[] } }) =>
      state.assignmentsReducer
  );

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as { _id: string; role?: string } | null;

  const role = currentUser?.role;
  const isFaculty = role === "FACULTY" || role === "ADMIN";
  const canEdit = !!isFaculty;

  const isNew = aid === "new";

  const original = assignments.find(
    (a: Assignment) => a.course === cid && a._id === aid
  );

  const [assignment, setAssignment] = useState<Assignment>(
    isNew
      ? {
          _id: "",
          course: String(cid),
          title: "",
          description: "",
          points: 100,
          group: "ASSIGNMENTS",
          displayGradeAs: "Points",
          submissionType: "Online",
          onlineEntryOptions: [],
          assignTo: "",
          due: "",
          availableFrom: "",
          availableUntil: "",
        }
      : {
          ...(original || {
            _id: "",
            course: String(cid),
            title: "",
            description: "",
            points: 100,
            group: "ASSIGNMENTS",
            displayGradeAs: "Points",
            submissionType: "Online",
            onlineEntryOptions: [],
            assignTo: "",
            due: "",
            availableFrom: "",
            availableUntil: "",
          }),
        }
  );

  useEffect(() => {
    if (isNew) return;
    const load = async () => {
      try {
        const serverAssignment = await client.fetchAssignmentById(String(aid));
        if (!serverAssignment || serverAssignment.course !== cid) {
          router.push(`/Courses/${cid}/Assignments`);
          return;
        }
        setAssignment(serverAssignment);
      } catch {
        router.push(`/Courses/${cid}/Assignments`);
      }
    };
    load();
  }, [isNew, aid, cid, router]);

  const handleCheckbox = (option: string) => {
    if (!canEdit) return;
    const current = assignment.onlineEntryOptions || [];
    setAssignment({
      ...assignment,
      onlineEntryOptions: current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option],
    });
  };

  const handleSave = async () => {
    if (!canEdit) return;
    try {
      let saved: Assignment;

      if (isNew) {
        saved = await client.createAssignmentForCourse(String(cid), {
          ...assignment,
          _id: "",
        });
        const next = [...assignments, saved];
        dispatch(setAssignments(next));
      } else {
        saved = await client.updateAssignment(assignment);
        const next = assignments.map((a) =>
          a._id === saved._id ? saved : a
        );
        dispatch(setAssignments(next));
      }

      router.push(`/Courses/${cid}/Assignments`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <FormGroup className="mb-3" controlId="wd-name">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl
            type="text"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
            readOnly={!canEdit}
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="wd-description">
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            rows={6}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
            readOnly={!canEdit}
          />
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-points">
          <FormLabel column sm={2}>
            Points
          </FormLabel>
          <Col sm={4}>
            <FormControl
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: Number(e.target.value),
                })
              }
              readOnly={!canEdit}
            />
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-group">
          <FormLabel column sm={2}>
            Assignment Group
          </FormLabel>
          <Col sm={4}>
            <FormSelect
              value={assignment.group || "ASSIGNMENTS"}
              onChange={(e) =>
                setAssignment({ ...assignment, group: e.target.value })
              }
              disabled={!canEdit}
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
              <option value="LABS">LABS</option>
            </FormSelect>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3" controlId="wd-display-grade-as">
          <FormLabel column sm={2}>
            Display Grade as
          </FormLabel>
          <Col sm={4}>
            <FormSelect
              value={assignment.displayGradeAs || "Points"}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  displayGradeAs: e.target.value,
                })
              }
              disabled={!canEdit}
            >
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
              <option value="Letter Grade">Letter Grade</option>
              <option value="GPA">GPA</option>
            </FormSelect>
          </Col>
        </FormGroup>

        <Card className="mb-3">
          <CardBody>
            <FormGroup className="mb-3" controlId="wd-submission-type">
              <FormLabel>Submission Type</FormLabel>
              <FormSelect
                value={assignment.submissionType || "Online"}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    submissionType: e.target.value,
                  })
                }
                disabled={!canEdit}
              >
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="No submission">No submission</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>Online Entry Options</FormLabel>
              <div>
                {[
                  "Text Entry",
                  "Website URL",
                  "Media Recordings",
                  "Student Annotation",
                  "File Uploads",
                ].map((opt) => (
                  <FormCheck
                    key={opt}
                    type="checkbox"
                    label={opt}
                    checked={
                      assignment.onlineEntryOptions?.includes(opt) || false
                    }
                    onChange={() => handleCheckbox(opt)}
                    disabled={!canEdit}
                  />
                ))}
              </div>
            </FormGroup>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardBody>
            <FormGroup className="mb-3">
              <FormLabel>Assign to</FormLabel>
              <FormControl
                type="text"
                value={assignment.assignTo || ""}
                onChange={(e) =>
                  setAssignment({ ...assignment, assignTo: e.target.value })
                }
                readOnly={!canEdit}
              />
            </FormGroup>

            <Row className="mb-3">
              <Col sm={4}>
                <FormGroup controlId="wd-due-date">
                  <FormLabel>Due</FormLabel>
                  <FormControl
                    type="date"
                    value={assignment.due || ""}
                    onChange={(e) =>
                      setAssignment({ ...assignment, due: e.target.value })
                    }
                    readOnly={!canEdit}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4}>
                <FormGroup controlId="wd-available-from">
                  <FormLabel>Available from</FormLabel>
                  <FormControl
                    type="date"
                    value={assignment.availableFrom || ""}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableFrom: e.target.value,
                      })
                    }
                    readOnly={!canEdit}
                  />
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup controlId="wd-available-until">
                  <FormLabel>Until</FormLabel>
                  <FormControl
                    type="date"
                    value={assignment.availableUntil || ""}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableUntil: e.target.value,
                      })
                    }
                    readOnly={!canEdit}
                  />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <div className="mt-4 d-flex justify-content-end">
          <Link
            href={`/Courses/${cid}/Assignments`}
            className="btn btn-secondary me-2"
          >
            Cancel
          </Link>
          {canEdit && (
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
