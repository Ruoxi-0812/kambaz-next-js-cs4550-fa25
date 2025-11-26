"use client";

import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../Account/client";
import type { User } from "../../../Account/client";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");       
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const data = await client.findUserById(uid);
    setUser(data);
    setName(`${data.firstName ?? ""} ${data.lastName ?? ""}`.trim());
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid || !user) return null;

  const saveUser = async () => {
    const trimmed = name.trim();
    const [firstName, ...rest] = trimmed.split(" ");
    const lastName = rest.join(" ");

    const updatedUser: User = {
      ...user,
      firstName,
      lastName,
    };

    const serverUser = await client.updateUser(updatedUser);
    setUser(serverUser);
    setEditing(false);
    onClose();          
  };

  const handleDelete = async () => {
    if (!uid) return;
    await client.deleteUser(uid);
    onClose();
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}

        {!editing && (
          <div
            className="wd-name"
            onClick={() => setEditing(true)}
            style={{ cursor: "pointer" }}
          >
            {user.firstName} {user.lastName}
          </div>
        )}

        {editing && (
          <FormControl
            className="w-75 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>

      <b>Role:</b> <span className="wd-role">{user.role}</span> <br />
      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span>
      <br />
      <hr />

      <div className="mt-4 d-flex gap-2 justify-content-end">
  <button className="btn btn-secondary" onClick={onClose}>
    Cancel
  </button>
  <button className="btn btn-danger" onClick={handleDelete}>
    Delete
  </button>
</div>
    </div>
  );
}
