"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import {
  addModule,
  editModule,
  updateModule as updateModuleInState,
  deleteModule as deleteModuleInState,
  setModules,
} from "./reducer";
import type { RootState, AppDispatch } from "../../../store";
import type { Module } from "./reducer";
import * as coursesClient from "../../client";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState("");
  const modules = useSelector(
    (state: RootState) => state.modulesReducer.modules
  ) as Module[];
  const dispatch = useDispatch<AppDispatch>();

  const fetchModules = async () => {
    if (!cid) return;
    try {
      const serverModules = await coursesClient.findModulesForCourse(
        String(cid)
      );
      dispatch(setModules(serverModules));
    } catch (e) {
      console.error("Failed to load modules:", e);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const courseModules = modules;

  const onCreateModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;
    try {
      const newModule = await coursesClient.createModuleForCourse(
        String(cid),
        { name: moduleName.trim() }
      );
      dispatch(setModules([...modules, newModule]));
      setModuleName("");
    } catch (e) {
      console.error("Create module failed:", e);
    }
  };

  const onRemoveModule = async (moduleId: string) => {
    try {
      await coursesClient.deleteModule(moduleId);
      dispatch(setModules(modules.filter((m) => m._id !== moduleId)));
    } catch (e) {
      console.error("Delete module failed:", e);
    }
  };

  const onSaveModule = async (module: Module) => {
    try {
      const updated = await coursesClient.updateModule(module);
      const newModules = modules.map((m) =>
        m._id === updated._id ? updated : m
      );
      dispatch(setModules(newModules));
    } catch (e) {
      console.error("Update module failed:", e);
    }
  };

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />
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
              {!module.editing && <span>{module.name}</span>}
              {module.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  defaultValue={module.name}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) =>
                    dispatch(
                      updateModuleInState({
                        ...module,
                        name: e.target.value,
                        lessons: module.lessons ?? [],
                      })
                    )
                  }
                  onKeyDown={(
                    e: React.KeyboardEvent<HTMLInputElement>
                  ) => {
                    if (e.key === "Enter") {
                      onSaveModule({
                        ...module,
                        editing: false,
                        lessons: module.lessons ?? [],
                      });
                    }
                  }}
                  autoFocus
                />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>
            {(module.lessons ?? []).length ? (
              <ListGroup className="wd-lessons rounded-0">
                {(module.lessons ?? []).map((lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                    <LessonControlButtons />
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
