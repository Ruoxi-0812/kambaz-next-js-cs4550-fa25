import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
export const USERS_API = `${HTTP_SERVER}/api/users`;

console.log("USERS_API =", USERS_API);

export type Credentials = {
  username: string;
  password: string;
};

export type User = {
  _id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role?: string;
};

export const signin = async (credentials: Credentials) => {
  const response = await axiosWithCredentials.post<User | null>(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post<User | null>(
    `${USERS_API}/profile`
  );
  return response.data;
};

export const signup = async (user: User) => {
  const response = await axiosWithCredentials.post<User>(
    `${USERS_API}/signup`,
    user
  );
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signout`
  );
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put<User>(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};
