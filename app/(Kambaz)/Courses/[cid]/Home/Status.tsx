import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaBullhorn, FaChartBar, FaBell, FaHome } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "350px" }}>
      <h2>Course Status</h2>

      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button
            variant="secondary"
            size="lg"
            className="w-100 text-nowrap"
            id="wd-course-unpublish-btn"
          >
            <MdDoNotDisturbAlt className="me-2 fs-5" />
            Unpublish
          </Button>
        </div>
        <div className="w-50">
          <Button
            variant="success"
            size="lg"
            className="w-100 text-nowrap"
            id="wd-course-publish-btn"
          >
            <FaCheckCircle className="me-2 fs-5" />
            Publish
          </Button>
        </div>
      </div>

      <br />

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-import-existing-btn"
      >
        <BiImport className="me-2 fs-5" />
        Import Existing Content
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-import-commons-btn"
      >
        <LiaFileImportSolid className="me-2 fs-5" />
        Import from Commons
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-choose-home-btn"
      >
        <FaHome className="me-2 fs-5" />
        Choose Home Page
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-view-course-stream-btn"
      >
        <FaChartBar className="me-2 fs-5" />
        View Course Stream
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-new-announcement-btn"
      >
        <FaBullhorn className="me-2 fs-5" />
        New Announcement
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-new-analytics-btn"
      >
        <FaChartBar className="me-2 fs-5" />
        New Analytics
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
        id="wd-view-notifications-btn"
      >
        <FaBell className="me-2 fs-5" />
        View Course Notifications
      </Button>
    </div>
  );
}
