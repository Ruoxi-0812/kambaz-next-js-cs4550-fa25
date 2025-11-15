"use client";
import React, { useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import * as client from "./client";
import type { Assignment } from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<Assignment>({
    id: 0,
    title: "",
    description: "",
    due: "",
    completed: false,
    score: 0,
  });

  const fetchAssignment = async (): Promise<void> => {
    const data = await client.fetchAssignment(); 
    setAssignment(data);
  };

  const updateTitleOnServer = async (title: string): Promise<void> => {
    const updated = await client.updateTitle(title);
    setAssignment(updated);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>

      <FormControl
        className="mb-2"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <FormControl
        as="textarea"
        rows={3}
        className="mb-2"
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <FormControl
        type="date"
        className="mb-2"
        value={assignment.due}
        onChange={(e) =>
          setAssignment({ ...assignment, due: e.target.value })
        }
      />
      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>

      <button
        className="btn btn-primary me-2"
        onClick={() => updateTitleOnServer(assignment.title)}
      >
        Update Title
      </button>

      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
