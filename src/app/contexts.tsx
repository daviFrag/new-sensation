"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const query_client = new QueryClient();

export default function Contexts(props: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <QueryClientProvider client={query_client}>
        {props.children}
      </QueryClientProvider>
    </UserProvider>
    
  );
}
