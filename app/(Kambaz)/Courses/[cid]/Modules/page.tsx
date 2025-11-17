"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, FormControl, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import type { RootState, AppDispatch } from "../../../store";
import type { Module } from "./reducer";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState("");
  const modules = useSelector(
    (state: RootState) => state.modulesReducer.modules
  ) as Module[];
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  ) as { _id: string; role?: string } | null;

  const role = currentUser?.role ?? "";
  const isFaculty = role === "FACULTY";
  const isStudent = role === "STUDENT" || role === "USER";

  const courseModules = modules.filter((m) => m.course === String(cid));

  return (
    <div className="wd-modules">
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={() => {
            if (!moduleName.trim()) return;
            dispatch(
              addModule({ name: moduleName.trim(), course: String(cid) })
            );
            setModuleName("");
          }}
        />
      )}

      {isStudent && (
        <Button
          variant="secondary"
          size="lg"
          className="me-2 float-end"
          id="wd-collapse-all"
        >
          Collapse All
        </Button>
      )}

      <br />
      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.map((module) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {(!module.editing || !isFaculty) && <span>{module.name}</span>}
              {module.editing && isFaculty && (
                <FormControl
                  className="w-50 d-inline-block"
                  defaultValue={module.name}
                  onChange={(e) =>
                    dispatch(
                      updateModule({
                        ...module,
                        name: e.target.value,
                        lessons: module.lessons ?? [],
                      })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(
                        updateModule({
                          ...module,
                          editing: false,
                          lessons: module.lessons ?? [],
                        })
                      );
                    }
                  }}
                  autoFocus
                />
              )}

              {isFaculty && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>

            {(module.lessons ?? []).length ? (
              <ListGroup className="wd-lessons rounded-0">
                {(module.lessons ?? []).map((lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                    {isFaculty && <LessonControlButtons />}
                  </ListGroupItem>
                ))}
              </ListGroup>
            ) : null}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
