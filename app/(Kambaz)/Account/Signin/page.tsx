"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

type Credentials = {
  username: string;
  password: string;
};

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "ruoxi",
    password: "123456",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignin = async () => {
    setError("");
    try {
      const user = await client.signin(credentials);
      if (!user) {
        setError("Invalid username or password.");
        return;
      }
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (_err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>

      {error && (
        <div className="text-danger mb-2" id="wd-signin-error">
          {error}
        </div>
      )}

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

      <Button
        onClick={handleSignin}
        id="wd-signin-btn"
        className="w-100 mb-2"
      >
        Sign in
      </Button>

      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
