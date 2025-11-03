"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

type Credentials = {
  username: string;
  password: string;
};

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "ruoxi",
    password: "123456",
  });

  const dispatch = useDispatch();

  const signin = () => {
    const user = (db.users as Array<{ username: string; password: string }>).find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;

    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>

      <FormControl
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />

      <FormControl
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />

      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>

      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
