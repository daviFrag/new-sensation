'use client'

import React from "react";
import RedirectButton from "./RedirectButton";
import { links, linksPermissions } from "@/utils/links";
import { Logout } from "@/components/Icons";
import { useCustomUserContext } from "../context/userStore";
import { withPageAuthorized } from "@/components/AuthValidation";

export default withPageAuthorized(function Start() {
  const { user } = useCustomUserContext()

  return (
    <>
      <h2 className="text-white">Buongiorno {user.nickname}</h2>
      {Object.keys(links).filter((link) => user?.permissions?.includes(linksPermissions[link as keyof typeof linksPermissions])).map((link) => (
        <RedirectButton
          text={links[link as keyof typeof links]}
          redirect_link={link}
          key={link}
        />
      ))}

      <button
        className="absolute bottom-0 right-0 m-10 w-20 aspect-square bg-orange-100 hover:bg-orange-200 hover:scale-110 ease-in-out duration-100 rounded-xl p-2"
        
      >
        <Logout color="black" />
      </button>
    </>
  );
},{
  returnTo: '/select'
})
