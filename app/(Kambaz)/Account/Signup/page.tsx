"use client";
import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";
import { useEffect } from "react";

export default function Signup() {
  useEffect(() => {
    localStorage.removeItem("profileOverride");
    localStorage.removeItem("currentUser");
  }, []);

  return (
    <div id="wd-signup-screen" className="pe-3">
      <h1>Sign up</h1>

      <FormControl
        id="wd-signup-username"
        placeholder="username"
        className="mb-2"
      />
      <FormControl
        id="wd-signup-password"
        type="password"
        placeholder="password"
        className="mb-2"
      />
      <Link
        id="wd-signup-btn"
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-2"
      >
        Signup
      </Link>
      
      <Link id="wd-signin-link" href="/Account/Signin">
        Signin
      </Link>
    </div>
  );
}
