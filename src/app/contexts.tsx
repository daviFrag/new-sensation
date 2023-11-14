"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query_client = new QueryClient();

export default function Contexts(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={query_client}>
      {props.children}
    </QueryClientProvider>
  );
}
