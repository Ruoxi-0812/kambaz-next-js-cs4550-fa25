import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity?: string;
  totalActivity?: string;
};

export const fetchPeopleForCourse = async (courseId: string) => {
  const { data } = await axios.get<User[]>(
    `${COURSES_API}/${courseId}/people`
  );
  return data;
};

export const createUserForCourse = async (
  courseId: string,
  user: Omit<User, "_id">
) => {
  const { data } = await axios.post<User>(
    `${COURSES_API}/${courseId}/people`,
    user
  );
  return data;
};

export const updateUserInCourse = async (courseId: string, user: User) => {
  if (!user._id) throw new Error("Missing _id in user");
  const { data } = await axios.put<User>(
    `${COURSES_API}/${courseId}/people/${user._id}`,
    user
  );
  return data;
};

export const deleteUserFromCourse = async (courseId: string, userId: string) => {
  await axios.delete(`${COURSES_API}/${courseId}/people/${userId}`);
};