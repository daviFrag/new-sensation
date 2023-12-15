import React from "react";
import { links } from "@/utils/links";
import Navbar from "@/components/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mb-44'>
      <Navbar text={links.rules} />
      {children}
    </div>
  );
}
