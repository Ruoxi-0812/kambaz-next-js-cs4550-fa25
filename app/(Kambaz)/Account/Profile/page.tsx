"use client";

import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";

type ProfileUser = {
  _id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role?: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as ProfileUser | null;

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    if (!currentUser) {
      redirect("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  }, [currentUser]);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            placeholder="Username"
            defaultValue={profile.username ?? ""}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            type="password"
            placeholder="Password"
            defaultValue={profile.password ?? ""}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            placeholder="First Name"
            defaultValue={profile.firstName ?? ""}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            placeholder="Last Name"
            defaultValue={profile.lastName ?? ""}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            placeholder="Date of Birth"
            defaultValue={profile.dob ?? ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            type="email"
            placeholder="Email"
            defaultValue={profile.email ?? ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            className="form-control mb-2"
            id="wd-role"
            defaultValue={profile.role ?? "USER"}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
