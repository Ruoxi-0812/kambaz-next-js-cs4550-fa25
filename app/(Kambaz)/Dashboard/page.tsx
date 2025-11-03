"use client";

import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import {
  enroll as enrollAction,
  unenroll as unenrollAction,
} from "../Courses/[cid]/Enrollments/reducer";

type Course = {
  _id: string;
  name: string;
  description: string;
  image?: string;
  number?: string;
  startDate?: string;
  endDate?: string;
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((s: RootState) => s.coursesReducer);
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  ) as { _id: string; role?: string } | null;
  const enrollments = useSelector(
    (s: RootState) => s.enrollmentsReducer.enrollments
  ) as Array<{ user: string; course: string }>;

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const [showAll, setShowAll] = useState(false);

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const startEdit = (c: Course) => setCourse({ ...c });
  const userId = currentUser?._id ?? null;

  const isEnrolled = (courseId: string) =>
    !!(
      userId &&
      enrollments.some((en) => en.user === userId && en.course === courseId)
    );

  const visibleCourses = useMemo(() => {
    if (!userId) return [];
    return showAll ? courses : courses.filter((c) => isEnrolled(c._id));
  }, [showAll, courses, enrollments, userId]);

  const toggleEnroll = (courseId: string) => {
    if (!userId) return;
    if (isEnrolled(courseId)) {
      dispatch(unenrollAction({ user: userId, course: courseId }));
    } else {
      dispatch(enrollAction({ user: userId, course: courseId }));
    }
  };

  return (
    <div id="wd-dashboard" className="p-4">
      <div className="d-flex align-items-center justify-content-between">
        <h1 id="wd-dashboard-title" className="mb-0">
          Dashboard
        </h1>
        <Button
          id="wd-enrollments-toggle"
          variant="primary"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? "Show My Enrollments" : "Enrollments"}
        </Button>
      </div>

      <hr />

      {isFaculty && (
        <>
          <h5 className="mb-2">
            New Course
            <Button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </Button>
            <Button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </Button>
          </h5>

          <FormControl
            className="mb-2"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course name"
          />
          <FormControl
            className="mb-2"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            as="textarea"
            rows={3}
            placeholder="Course description"
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c) => {
            const enrolled = isEnrolled(c._id);
            return (
              <Col
                key={c._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={`/Courses/${c._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src={c.image || "/images/reactjs.jpg"}
                      width="100%"
                      height={160}
                      alt={c.name}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </CardText>

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <Button variant="primary" className="px-3">
                          Go
                        </Button>

                        <div className="d-flex gap-2">
                          {isFaculty && (
                            <>
                              <Button
                                id="wd-edit-course-click"
                                className="btn btn-warning px-3"
                                onClick={(e) => {
                                  e.preventDefault();
                                  startEdit(c);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                id="wd-delete-course-click"
                                className="btn btn-danger px-3"
                                onClick={(e) => {
                                  e.preventDefault();
                                  dispatch(deleteCourse(c._id));
                                }}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="d-flex mt-2">
                        <Button
                          className="me-auto" 
                          style={{ width: 90 }}
                          variant={enrolled ? "danger" : "success"}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleEnroll(c._id);
                          }}
                          id={
                            enrolled
                              ? "wd-unenroll-course-click"
                              : "wd-enroll-course-click"
                          }
                        >
                          {enrolled ? "Unenroll" : "Enroll"}
                        </Button>
                      </div>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
