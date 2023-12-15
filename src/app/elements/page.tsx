import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import ClientPage from "./ClientPage";

export default withPageAuthRequired(async function Elements() {
  const session = await getSession();

  return (
    <ClientPage
      access_token={session?.accessToken}
    />
  );
},{
  returnTo: "elements"
})
