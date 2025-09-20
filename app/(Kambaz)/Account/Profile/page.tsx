import Link from "next/link";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input defaultValue="ruoxi" placeholder="username"/><br/>
      <input defaultValue="123"   placeholder="password" type="password" /><br/>
      <input defaultValue="Ruoxi" placeholder="First Name" /><br/>
      <input defaultValue="Wang" placeholder="Last Name" /><br/>
      <input defaultValue="2000-01-01" type="date" id="wd-dob" /><br/>
      <input defaultValue="wang.ruoxi2@northeastern.edu" type="email" id="wd-email" /><br/>
      <select defaultValue="FACULTY" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select><br/>
      <Link href="Signin" > Sign out </Link>
    </div>
);}
