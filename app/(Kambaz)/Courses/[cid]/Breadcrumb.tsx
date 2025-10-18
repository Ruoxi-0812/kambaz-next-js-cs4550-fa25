"use client";
import React from "react";
import { usePathname } from "next/navigation";


export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
 const pathname = usePathname();
 const parts = pathname.split("/").filter(Boolean);     
  const cidPos = parts.indexOf("Courses") + 1;         
  const section = parts[cidPos + 1] || "";   
 return (
   <span>
     Course {course?.name} &gt; {section}
   </span>
 );
}