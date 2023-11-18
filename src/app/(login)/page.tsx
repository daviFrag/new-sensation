"use client";

import { setLocalStorageUserWithJwt } from "@/services/auth/localStorageService";
import { useRouter } from "next/navigation";
import { FormEventHandler, useContext } from "react";

export default function Home() {
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: HTMLInputElement;
      password: HTMLInputElement;
    };
    const username = target.username.value;
    const password = target.password.value;
    // TODO auth
    const access_token = "MYJWT";
    setLocalStorageUserWithJwt({ user: { username }, access_token });
    router.push("./select");
  };

  return (
    <form
      className="flex flex-col px-40 py-32 gap-4 rounded-xl text-white"
      onSubmit={onSubmit}
    >
      <label htmlFor="username" className="text-left">
        Username
      </label>
      <input
        id="username"
        type="text"
        className="pl-3 border border-black text-black"
      />
      <label htmlFor="password" className="text-left">
        Password
      </label>
      <input
        id="password"
        type="password"
        className="pl-3 border border-black text-black"
      />
      <button
        type="submit"
        className="mr-auto border border-black p-2 hover:scale-110 ease-in-out duration-100 bg-sky-500"
      >
        LOGIN
      </button>
    </form>
  );
}
