import axios from "axios";

const SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const USERS_API = `${SERVER}/api/users`;

export const getUserEnrollments = async (uid: string) => {
  const response = await axios.get(`${USERS_API}/${uid}/enrollments`, {
    withCredentials: true,
  });
  return response.data;
};

export const enroll = async (userId: string, courseId: string) => {
  const response = await axios.post(
    `${USERS_API}/${userId}/courses/${courseId}`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

export const unenroll = async (userId: string, courseId: string) => {
  const response = await axios.delete(
    `${USERS_API}/${userId}/courses/${courseId}`,
    { withCredentials: true }
  );
  return response.data;
};
