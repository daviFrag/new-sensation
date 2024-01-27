import React from "react";

export function NoElementMenu(props: {
  Svg: () => JSX.Element;
  svg_dimension: "small" | "big";
  title: string;
  text: string;
  url?: string;
  button_text?: string;
  ButtonComponent?: () => JSX.Element;
}) {
  const { Svg, svg_dimension, title, text, url, button_text, ButtonComponent } = props;

  return (
    <div className="flex flex-col items-center w-1/2 mt-0 mx-auto">
      <div
        className={`${svg_dimension === "small" ? "h-48" : "h-60 mt-20"} mb-10`}
      >
        <Svg />
      </div>
      <h2 className="font-bold text-5xl mb-10 text-center">{title}</h2>
      <p className="text-3xl mb-10 text-center">{text}</p>
      {url && (
        <a href={url}>
          <button className="uppercase bg-sky-400 text-2xl text-white px-10 py-5 ease-in-out duration-75 hover:bg-sky-500 rounded-xl">
            {button_text}
          </button>
        </a>
      )}
      {ButtonComponent && (
        <ButtonComponent />
      )}
    </div>
  );
}
