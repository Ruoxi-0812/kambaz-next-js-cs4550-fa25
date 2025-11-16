"use client";

import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModulesControlButtons";
import LessonControlButtons from "./LessonControlButtons";

import { setModules, editModule, updateModule, deleteModule } from "./reducer";

import * as client from "../../client";
import type { RootState } from "../../../store";

interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const { modules } = useSelector((state: RootState) => state.modulesReducer);

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as { _id: string; role?: string } | null;

  const role = currentUser?.role;
  const isFaculty = role === "FACULTY" || role === "ADMIN";

  const [moduleName, setModuleName] = useState("");

  const fetchModules = async () => {
    if (!cid) return;
    const data = await client.findModulesForCourse(cid);
    dispatch(setModules(data));
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const onCreateModuleForCourse = async () => {
    if (!cid || !moduleName.trim() || !isFaculty) return;
    const newModule = { name: moduleName };
    const created = await client.createModuleForCourse(cid, newModule);
    dispatch(setModules([...modules, created]));
    setModuleName("");
  };

  const onUpdateModule = async (module: Module) => {
    if (!isFaculty) return;
    await client.updateModule(module);
    const updatedModules = modules.map((m: Module) =>
      m._id === module._id ? module : m
    );
    dispatch(setModules(updatedModules));
  };

  const onRemoveModule = async (moduleId: string) => {
    if (!isFaculty) return;
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  return (
    <div>
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}

      <br />
      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />

              {!module.editing && module.name}

              {module.editing && isFaculty && (
                <FormControl
                  className="w-50 d-inline-block"
                  value={module.name}
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...module, editing: false });
                    }
                  }}
                />
              )}

              {isFaculty && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={onRemoveModule}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
