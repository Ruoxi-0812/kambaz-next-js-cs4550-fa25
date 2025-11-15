import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const USERS_API = `${HTTP_SERVER}/api/users`;

export type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

export const fetchMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get<Enrollment[]>(
    `${USERS_API}/current/enrollments`
  );
  return data;
};

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post<Enrollment>(
    `${USERS_API}/current/courses/${courseId}/enroll`
  );
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/current/courses/${courseId}/enroll`
  );
  return data;
};
