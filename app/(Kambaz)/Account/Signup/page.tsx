import React from "react";
import Link from "next/link";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input placeholder="username" defaultValue="ruoxi" className="wd-username" /><br/>
      <input placeholder="password" type="password" defaultValue="123" className="wd-password" /><br/>
      <input placeholder="verify password"
             type="password" defaultValue="123" className="wd-password-verify" /><br/>
      <Link  href="Profile" > Sign up </Link><br />
      <Link  href="Signin" > Sign in </Link>
    </div>
);}
