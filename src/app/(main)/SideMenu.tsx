import React from "react";
import { deleteLocalStorageUserWithJwt } from "@/services/auth/localStorageService";
import { links } from "@/utils/links";
import { useRouter } from "next/navigation";
import Hamburger from "@/svg/Hamburger";
import Logout from "@/svg/Logout";
import Controller from "@/svg/Controller";
import Docs from "@/svg/Docs";
import Joystick from "@/svg/Joystick";
import Question from "@/svg/Question";
import Plus from "@/svg/Plus";

const links_svgs = {
  create: <Plus />,
  rules: <Docs />,
  elements: <Controller />,
  games: <Joystick />,
  tutorial: <Question />,
} as const;

export default function SideMenu({
  text,
  hideMenu,
}: {
  text: string;
  hideMenu: () => void;
}) {
  const router = useRouter();

  return (
    <aside
      className="flex flex-col text-3xl text-white h-screen w-5/12 fixed top-0 left-0 z-20"
      style={{ backgroundColor: "#146AB9" }}
    >
      <div className="h-32 flex items-center px-10">
        <button onClick={() => hideMenu()} className="h-20 aspect-square mt-6">
          <Hamburger />
        </button>
      </div>
      <nav className="flex flex-col h-full my-10">
        {Object.keys(links).map((link) => (
          <a
            href={link}
            key={link}
            className={`flex items-center gap-2 w-full px-10 py-3 hover:bg-orange-300 ease-in-out duration-75 ${
              links[link as keyof typeof links] === text ? "bg-orange-400" : ""
            }`}
          >
            <div className="h-12 w-12">
              {links_svgs[link as keyof typeof links]}
            </div>
            <p className="uppercase">{links[link as keyof typeof links]}</p>
          </a>
        ))}
        <div
          className="flex items-center gap-2 w-full px-10 py-3 hover:bg-orange-300 ease-in-out duration-75 mt-auto cursor-pointer"
          onClick={() => {
            // TODO auth
            deleteLocalStorageUserWithJwt();
            router.push("./");
          }}
        >
          <div className="h-12 w-12">
            <Logout color="white" />
          </div>
          <p className="uppercase">Esci</p>
        </div>
      </nav>
    </aside>
  );
}
