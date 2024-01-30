import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/select")
  }

  return (

    <a
      className="bg-white rounded-md w-[20%]"
      href={"/api/auth/login"}
    >
      Login
    </a>
  );
}
