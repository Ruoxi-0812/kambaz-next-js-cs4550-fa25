"use client";

import { useEffect, useState } from "react";
import { Table, Button, FormControl } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import type { User } from "../../../../Users/client";
import {
  fetchPeopleForCourse,
  createUserForCourse,
  updateUserInCourse,
  deleteUserFromCourse,
} from "../../../../Users/client";

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const [people, setPeople] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<User>({
    firstName: "",
    lastName: "",
    loginId: "",
    section: "",
    role: "STUDENT",
    lastActivity: "—",
    totalActivity: "—",
  });

  const isEditing = (id: string) => editingId === id;

  const load = async () => {
    if (!cid) return;
    const data = await fetchPeopleForCourse(String(cid));
    setPeople(data);
  };

  useEffect(() => {
    load();
  }, [cid]);

  // 创建新用户并 enroll 到当前课程
  const handleCreate = async () => {
    if (!cid) return;
    if (!draft.firstName.trim() || !draft.lastName.trim()) return;
    const created = await createUserForCourse(String(cid), {
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
      loginId: draft.loginId.trim(),
      section: draft.section.trim(),
      role: draft.role,
      lastActivity: draft.lastActivity,
      totalActivity: draft.totalActivity,
    });
    setPeople([...people, created]);
    setDraft({
      firstName: "",
      lastName: "",
      loginId: "",
      section: "",
      role: "STUDENT",
      lastActivity: "—",
      totalActivity: "—",
    });
  };

  const startEdit = (user: User) => {
    setEditingId(user._id!);
    setDraft(user);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({
      firstName: "",
      lastName: "",
      loginId: "",
      section: "",
      role: "STUDENT",
      lastActivity: "—",
      totalActivity: "—",
    });
  };

  const saveEdit = async () => {
    if (!cid || !draft._id) return;
    const updated = await updateUserInCourse(String(cid), draft);
    const next = people.map((u) => (u._id === updated._id ? updated : u));
    setPeople(next);
    cancelEdit();
  };

  const handleDelete = async (userId: string) => {
    if (!cid) return;
    await deleteUserFromCourse(String(cid), userId);
    setPeople(people.filter((u) => u._id !== userId));
  };

  const handleDraftChange = (field: keyof User, value: string) => {
    setDraft({ ...draft, [field]: value });
  };

  return (
    <div id="wd-people-table">
      {/* 顶部简单的新增行 */}
      <div className="mb-3 d-flex gap-2 align-items-center">
        <FormControl
          placeholder="First name"
          style={{ maxWidth: 140 }}
          value={draft.firstName}
          onChange={(e) => handleDraftChange("firstName", e.target.value)}
        />
        <FormControl
          placeholder="Last name"
          style={{ maxWidth: 140 }}
          value={draft.lastName}
          onChange={(e) => handleDraftChange("lastName", e.target.value)}
        />
        <FormControl
          placeholder="Login ID"
          style={{ maxWidth: 160 }}
          value={draft.loginId}
          onChange={(e) => handleDraftChange("loginId", e.target.value)}
        />
        <FormControl
          placeholder="Section"
          style={{ maxWidth: 100 }}
          value={draft.section}
          onChange={(e) => handleDraftChange("section", e.target.value)}
        />
        <FormControl
          placeholder="Role"
          style={{ maxWidth: 120 }}
          value={draft.role}
          onChange={(e) => handleDraftChange("role", e.target.value)}
        />
        {editingId ? (
          <>
            <Button variant="success" size="sm" onClick={saveEdit}>
              Save
            </Button>
            <Button variant="secondary" size="sm" onClick={cancelEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="primary" size="sm" onClick={handleCreate}>
            Add User
          </Button>
        )}
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {people.map((user) => {
            const editing = isEditing(user._id!);
            return (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  {editing ? (
                    <>
                      <FormControl
                        className="d-inline-block w-auto me-1"
                        value={draft.firstName}
                        onChange={(e) =>
                          handleDraftChange("firstName", e.target.value)
                        }
                      />
                      <FormControl
                        className="d-inline-block w-auto"
                        value={draft.lastName}
                        onChange={(e) =>
                          handleDraftChange("lastName", e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <>
                      <span className="wd-first-name">{user.firstName}</span>{" "}
                      <span className="wd-last-name">{user.lastName}</span>
                    </>
                  )}
                </td>
                <td className="wd-login-id">
                  {editing ? (
                    <FormControl
                      value={draft.loginId}
                      onChange={(e) =>
                        handleDraftChange("loginId", e.target.value)
                      }
                    />
                  ) : (
                    user.loginId
                  )}
                </td>
                <td className="wd-section">
                  {editing ? (
                    <FormControl
                      value={draft.section}
                      onChange={(e) =>
                        handleDraftChange("section", e.target.value)
                      }
                    />
                  ) : (
                    user.section
                  )}
                </td>
                <td className="wd-role">
                  {editing ? (
                    <FormControl
                      value={draft.role}
                      onChange={(e) =>
                        handleDraftChange("role", e.target.value)
                      }
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td className="wd-last-activity">
                  {editing ? (
                    <FormControl
                      value={draft.lastActivity || ""}
                      onChange={(e) =>
                        handleDraftChange("lastActivity", e.target.value)
                      }
                    />
                  ) : (
                    user.lastActivity
                  )}
                </td>
                <td className="wd-total-activity">
                  {editing ? (
                    <FormControl
                      value={draft.totalActivity || ""}
                      onChange={(e) =>
                        handleDraftChange("totalActivity", e.target.value)
                      }
                    />
                  ) : (
                    user.totalActivity
                  )}
                </td>
                <td className="text-nowrap">
                  {editing ? null : (
                    <>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => startEdit(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() =>
                          user._id && handleDelete(user._id)
                        }
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}