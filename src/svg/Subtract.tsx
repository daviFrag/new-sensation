import React from "react";

export default function Subtract() {
  return (
    <svg
      width="759"
      height="1125"
      viewBox="0 0 759 1125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full"
      style={{
        transform: "scale(200%)",
      }}
    >
      <g filter="url(#filter0_d_402_8)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M41.9713 1117C345.924 999.723 613 808.762 613 618.586C613 396.068 322.731 137.493 4.58337 0H755V1117H41.9713Z"
          fill="#FF9900"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_402_8"
          x="0.583374"
          y="0"
          width="758.417"
          height="1125"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_402_8"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_402_8"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
