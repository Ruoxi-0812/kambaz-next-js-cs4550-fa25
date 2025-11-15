"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";
import { setCurrentUser } from "../reducer";
import type { User } from "../client";

type ErrorResponse = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};

export default function Signup() {
  const [user, setUser] = useState<User>({});
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      setError(null);
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (e: unknown) {
      const err = e as ErrorResponse;
      if (err.response?.status === 400) {
        setError(err.response.data?.message ?? "Username already in use");
      } else {
        setError("Unable to signup. Please try again.");
      }
    }
  };

  return (
    <div id="wd-signup-screen" className="pe-3">
      <h1>Sign up</h1>

      {error && <div className="text-danger mb-2">{error}</div>}

      <FormControl
        id="wd-signup-username"
        placeholder="username"
        className="mb-2"
        value={user.username ?? ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        id="wd-signup-password"
        type="password"
        placeholder="password"
        className="mb-2"
        value={user.password ?? ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FormControl
        id="wd-firstname"
        placeholder="First Name"
        className="mb-2"
        value={user.firstName ?? ""}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <FormControl
        id="wd-lastname"
        placeholder="Last Name"
        className="mb-2"
        value={user.lastName ?? ""}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />

      <Button
        id="wd-signup-btn"
        onClick={signup}
        className="btn btn-primary w-100 mb-2"
      >
        Signup
      </Button>

      <Link id="wd-signin-link" href="/Account/Signin">
        Signin
      </Link>
    </div>
  );
}
