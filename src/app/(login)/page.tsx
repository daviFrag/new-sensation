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
    <form className="flex flex-col px-40 py-32 gap-4 bg-sky-200 rounded-xl" onSubmit={onSubmit}>
      <label htmlFor="username" className="text-left">
        Username
      </label>
      <input id="username" type="text" className="pl-3 border border-black" />
      <label htmlFor="password" className="text-left">
        Password
      </label>
      <input id="password" type="password" className="pl-3 border border-black" />
      <button
        type="submit"
        className="mr-auto border border-black p-2 hover:scale-110"
      >
        Login
      </button>
    </form>
  );
}
