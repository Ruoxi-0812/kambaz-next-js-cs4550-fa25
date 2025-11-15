"use client";
import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleObj, setModuleObj] = useState({
    id: "M01",
    name: "NodeJS Module",
    description: "Intro to Node.js and Express",
    course: "CS4550",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />

      <h4>Modifying Assignment Title</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />

      <h4>Modifying Assignment Score</h4>
      <a
        id="wd-update-assignment-score"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-score"
        type="number"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({
            ...assignment,
            score: parseInt(e.target.value || "0"),
          })
        }
      />
      <hr />

      <h4>Modifying Assignment Completed</h4>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="form-check mb-0">
          <input
            id="wd-assignment-completed"
            className="form-check-input"
            type="checkbox"
            checked={assignment.completed}
            onChange={(e) =>
              setAssignment({ ...assignment, completed: e.target.checked })
            }
          />
          <label
            className="form-check-label ms-2"
            htmlFor="wd-assignment-completed"
          >
            Completed
          </label>
        </div>

        <a
          id="wd-update-assignment-completed"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>
      <hr />

      <h4>Module: Retrieving Objects</h4>
      <a
        id="wd-get-module"
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <hr />

      <h4>Module: Retrieving Properties</h4>
      <a
        id="wd-get-module-name"
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />

      <h4>Module: Modifying Name</h4>
      <a
        id="wd-update-module-name"
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/name/${moduleObj.name}`}
      >
        Update Module Name
      </a>
      <FormControl
        className="w-75"
        id="wd-module-name"
        defaultValue={moduleObj.name}
        onChange={(e) =>
          setModuleObj({ ...moduleObj, name: e.target.value })
        }
      />
      <hr />

      <h4>Module: Modifying Description</h4>
      <a
        id="wd-update-module-description"
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/description/${moduleObj.description}`}
      >
        Update Module Description
      </a>
      <FormControl
        className="w-75"
        id="wd-module-description"
        defaultValue={moduleObj.description}
        onChange={(e) =>
          setModuleObj({ ...moduleObj, description: e.target.value })
        }
      />
      <hr />
    </div>
  );
}
