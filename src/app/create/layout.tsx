'use client'

import React from "react";
import { links, linksPermissions } from "@/utils/links";
import Navbar from "@/components/Navbar";
import { withPageAuthorized } from "@/components/AuthValidation";

export default withPageAuthorized(function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mb-44'>
      <Navbar text={links.create} />
      {children}
    </div>
  );
},{
  returnTo: "/create",
  permissions: [
    linksPermissions.create
  ]
})
