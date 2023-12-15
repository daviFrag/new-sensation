import React from "react";
import { getSession } from "@auth0/nextjs-auth0";
import ClientPage from "./ClientPage";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(async function Create() {
  const session = await getSession();

  return (
    <ClientPage access_token={session?.accessToken}/>
  );
},{
  returnTo: '/create'
})
