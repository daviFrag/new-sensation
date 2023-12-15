"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  deleteLocalStorageUserWithJwt,
} from "@/services/auth/localStorageService";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Start() {
  const router = useRouter();

  return (
    <>
    </>
  );
},{
  returnTo: '/select'
})
