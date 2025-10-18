"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const pathname = usePathname();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const segment = label;
        const href =
          segment === "People"
            ? `/Courses/${cid}/People/Table`
            : `/Courses/${cid}/${segment}`;
        const isActive =
          pathname.endsWith(`/${segment}`) ||
          (label === "People" && pathname.includes(`/Courses/${cid}/People`));

        return (
          <Link
            key={label}
            href={href}
            id={`wd-course-${label.toLowerCase()}-link`}
            className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
