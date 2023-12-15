import React from "react";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import ClientPage from "./ClientPage";

export default withPageAuthRequired(async function Games() {
  const session = await getSession();

  return (
    <ClientPage access_token={session?.accessToken}/>
  );
},{
  returnTo: '/games'
})
