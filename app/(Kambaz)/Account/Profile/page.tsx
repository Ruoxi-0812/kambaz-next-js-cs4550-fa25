"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";

type Role = "USER" | "ADMIN" | "FACULTY" | "STUDENT";

type ProfileUser = {
  _id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role?: Role;
};

export default function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  ) as ProfileUser | null;
  const [profile, setProfile] = useState<ProfileUser | null>(null);

  useEffect(() => {
    if (!currentUser) {
      redirect("/Account/Signin");
      return;
    }
    setProfile({
      ...currentUser,
      role: currentUser.role ?? "STUDENT",
    });
  }, [currentUser]);

  const save = () => {
    if (!profile) return;
    dispatch(setCurrentUser(profile));
    localStorage.setItem("profileOverride", JSON.stringify(profile));
  };
  
  useEffect(() => {
    const raw = localStorage.getItem("profileOverride");
    if (raw && currentUser) {
      const stored = JSON.parse(raw) as ProfileUser;
      if (stored._id === currentUser._id) {
        setProfile(stored);
      }
    }
  }, [currentUser]);

  if (!profile) return null;

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>

      <FormControl
        className="mb-2"
        value={profile.username ?? ""}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />
      <FormControl
        className="mb-2"
        type="password"
        value={profile.password ?? ""}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      />
      <FormControl
        className="mb-2"
        value={profile.firstName ?? ""}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      />
      <FormControl
        className="mb-2"
        value={profile.lastName ?? ""}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      />
      <FormControl
        className="mb-2"
        type="date"
        value={profile.dob ?? ""}
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
      />
      <FormControl
        className="mb-2"
        value={profile.email ?? ""}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />

      <select
        className="form-control mb-2"
        value={profile.role ?? "STUDENT"}
        onChange={(e) =>
          setProfile({ ...profile, role: e.target.value as Role })
        }
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <div className="d-flex gap-2">
        <Button
          variant="secondary"
          className="w-100"
          onClick={save}
          id="wd-save-profile"
        >
          Save
        </Button>
        <Button
          variant="primary"
          className="w-100"
          id="wd-signout-btn"
          onClick={() => {
            dispatch(setCurrentUser(null));
            redirect("/Account/Signin");
          }}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
