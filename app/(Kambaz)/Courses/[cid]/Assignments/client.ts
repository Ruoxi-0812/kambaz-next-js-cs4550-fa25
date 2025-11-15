import axios from "axios";
import { HTTP_SERVER } from "../../client"; 
import type { Assignment as StoreAssignment } from "./reducer";

export type Assignment = StoreAssignment;

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const fetchAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get<Assignment[]>(
    `${COURSES_API}/${courseId}/assignments`
  );
  return data;
};

export const fetchAssignmentById = async (assignmentId: string) => {
  const { data } = await axios.get<Assignment>(
    `${ASSIGNMENTS_API}/${assignmentId}`
  );
  return data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Assignment
) => {
  const { data } = await axios.post<Assignment>(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return data;
};

export const updateAssignment = async (assignment: Assignment) => {
  const { data } = await axios.put<Assignment>(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};
