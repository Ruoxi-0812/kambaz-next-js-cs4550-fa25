"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, redirect } from "next/navigation";
import { RootState } from "../../store";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";

type Course = {
  _id: string;
  name: string;
  description: string;
  image?: string;
  number?: string;
  startDate?: string;
  endDate?: string;
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  const { cid } = useParams<{ cid: string }>();

  const { courses } = useSelector((s: RootState) => s.coursesReducer);
  const course = courses.find((c: Course) => c._id === String(cid));

  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  ) as { _id: string; role?: string } | null;

  const enrollments = useSelector(
    (s: RootState) => s.enrollmentsReducer.enrollments
  ) as Array<{ user: string; course: string }>;

  useEffect(() => {
    if (!currentUser) {
      redirect("/Account/Signin");
      return;
    }

    if (!course) {
      redirect("/Dashboard");
      return;
    }
    
    const enrolled = enrollments.some(
      (e) => e.user === currentUser._id && e.course === String(cid)
    );
    if (!enrolled) {
      redirect("/Dashboard");
    }
  }, [cid, currentUser, enrollments, course]);

  const [showNav, setShowNav] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify
          className="me-3 fs-4 mb-1"
          role="button"
          aria-label="Toggle course navigation"
          onClick={() => setShowNav((v) => !v)}
        />
        {course?.name ?? "Course"}
        <Breadcrumb course={course} />
      </h2>
      <hr />

      <div className="d-flex">
        {showNav && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
