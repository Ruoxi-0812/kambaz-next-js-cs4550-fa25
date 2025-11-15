import axios from "axios";
import type { Module } from "./[cid]/Modules/reducer";
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;

export type Course = {
  _id?: string;
  name: string;
  description: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
};

// ALWAYS USE axiosWithCredentials !!!

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${id}`
  );
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: { name: string }
) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return data;
};

export const deleteModule = async (moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}`
  );
  return data;
};

export const updateModule = async (module: Module) => {
  const { data } = await axiosWithCredentials.put(
    `${MODULES_API}/${module._id}`,
    module
  );
  return data;
};
