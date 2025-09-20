import Link from "next/link";
export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input id="wd-search-assignment" placeholder="Search for Assignments" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <div>
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am |{" "}
            <b>Due</b> May 13 at 11:59pm | 100 pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <div>
            Multiple Modules | <b>Not available until</b> May 13 at 12:00am |{" "}
            <b>Due</b> May 20 at 11:59pm | 100 pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </Link>
          <div>
            Multiple Modules | <b>Not available until</b> May 20 at 12:00am |{" "}
            <b>Due</b> May 27 at 11:59pm | 100 pts
          </div>
        </li>
      </ul>

      <h3 id="wd-quizzes-title">
        QUIZZES 10% of Total <button>+</button>
      </h3>
      <ul id="wd-quiz-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/q1"
            className="wd-assignment-link"
          >
            Q1 - HTML Basics
          </Link>
          <div>
            <b>Not available until</b> May 14 at 12:00am | <b>Due</b> May 15 at
            11:59pm | 20 pts
          </div>
        </li>
      </ul>

      <h3 id="wd-exams-title">
        EXAMS 30% of Total <button>+</button>
      </h3>
      <ul id="wd-exam-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/exam1"
            className="wd-assignment-link"
          >
            Exam
          </Link>
          <div>
            <b>Not available until</b> May 29 at 12:00am | <b>Due</b> May 30 at
            11:59pm | 100 pts
          </div>
        </li>
      </ul>

      <h3 id="wd-project-title">
        PROJECT 20% of Total <button>+</button>
      </h3>
      <ul id="wd-project-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/final"
            className="wd-assignment-link"
          >
            Final Project
          </Link>
          <div>
            Group project | <b>Not available until</b> May 10 at 12:00am |{" "}
            <b>Due</b> Jun 10 at 11:59pm | 200 pts
          </div>
        </li>
      </ul>
    </div>
  );
}
