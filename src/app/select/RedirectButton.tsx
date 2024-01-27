import React from "react";

export default function RedirectButton({
  text,
  redirect_link,
}: {
  text: string;
  redirect_link: string;
}) {
  return (
    <a
      href={`./${redirect_link}`}
      className=" hover:scale-110 ease-in-out duration-100"
    >
      <button className="bg-white m-2 mx-auto text-sky-800 text-3xl p-2 rounded-xl uppercase w-96">
        {text}
      </button>
    </a>
  );
}
