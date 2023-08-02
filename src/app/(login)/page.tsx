"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function Home() {
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // @ts-expect-error
    const username = event.target.username.value;
    // @ts-expect-error
    const password = event.target.password.value;
    // TODO API
    console.log(username, password);
    router.push("/start");
  };

  return (
    <form className="flex flex-col px-40 gap-4" onSubmit={onSubmit}>
      <label htmlFor="username" className="text-left">
        Username
      </label>
      <input id="username" type="text" className="pl-3" />
      <label htmlFor="password" className="text-left">
        Password
      </label>
      <input id="password" type="password" className="pl-3" />
      <button
        type="submit"
        className="mr-auto border border-black p-2 hover:scale-110"
      >
        Login
      </button>
    </form>
  );
}
