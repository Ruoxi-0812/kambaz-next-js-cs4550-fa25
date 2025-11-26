// app/(Kambaz)/Courses/[cid]/People/Table.tsx
"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "../Details";

export type User = {
  _id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
};

export default function PeopleTable({
  users = [],
  fetchUsers,
}: {
  users?: User[];
  fetchUsers: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  // ❌ 不要在这里自动调用 fetchUsers 了
  // useEffect(() => {
  //   fetchUsers();
  // }, [fetchUsers]);

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers(); 
          }}
        />
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <span
                  className="text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (!user._id) return;
                    setShowDetails(true);
                    setShowUserId(user._id);
                  }}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name text-danger">{user.firstName}</span>{" "}
                  <span className="wd-last-name text-danger">{user.lastName}</span>     
                </span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
