import { QueryClient } from "@tanstack/react-query";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New sensation",
};

const query_client = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body>{children}</body>
      </html>
  );
}
