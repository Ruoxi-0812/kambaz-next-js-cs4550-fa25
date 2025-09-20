import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/4550" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} />
            <div>
              <h5> CS4550 Web Development </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/4400" className="wd-dashboard-course-link">
            <Image src="/images/4400.jpg" width={200} height={150} />
            <div>
              <h5> CS4400 Programming Languages </h5>
              <p className="wd-dashboard-course-title">
                202610_1 Fall 2025 Semester Full Term
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/4700" className="wd-dashboard-course-link">
            <Image src="/images/4700.jpg" width={200} height={150} />
            <div>
              <h5> CS4700 Network Fundamentals </h5>
              <p className="wd-dashboard-course-title">
                202610_1 Fall 2025 Semester Full Term
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/3650" className="wd-dashboard-course-link">
            <Image src="/images/3650.jpg" width={200} height={150} />
            <div>
              <h5> CS3650 Computer Systems </h5>
              <p className="wd-dashboard-course-title">
                202510_1 Fall 2024 Semester Full Term
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/2800" className="wd-dashboard-course-link">
            <Image src="/images/2800.jpg" width={200} height={150} />
            <div>
              <h5> CS2800 Logic and Computation </h5>
              <p className="wd-dashboard-course-title">
                202530_1 Spring 2024 Semester Full Term
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1800" className="wd-dashboard-course-link">
            <Image src="/images/1800.jpg" width={200} height={150} />
            <div>
              <h5> CS1800 Discrete Structures </h5>
              <p className="wd-dashboard-course-title">
                202410_1 Fall 2023 Semester Full Term
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1210" className="wd-dashboard-course-link">
            <Image src="/images/1210.jpg" width={200} height={150} />
            <div>
              <h5> CS1210 Professional Development </h5>
              <p className="wd-dashboard-course-title">
                202510_1 Fall 2024 Semester Full Term
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
