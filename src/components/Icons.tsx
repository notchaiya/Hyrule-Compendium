import React from "react";

export const OutlineHeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M22 6V5h-1V4h-1V3h-6v1h-1v1h-2V4h-1V3H4v1H3v1H2v1H1v5h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1V6zm-2 4v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1H9v-1H8v-1H7v-1H6v-1H5v-1H4v-1H3V7h1V6h1V5h4v1h1v1h1v1h2V7h1V6h1V5h4v1h1v1h1v3z" />
  </svg>
);

export const SolidHeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M23 6v5h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1H9v-1H8v-1H7v-1H6v-1H5v-1H4v-1H3v-1H2v-1H1V6h1V5h1V4h1V3h6v1h1v1h2V4h1V3h6v1h1v1h1v1z" />
  </svg>
);

export const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <polygon points="22 17 22 19 21 19 21 20 20 20 20 21 18 21 18 22 16 22 16 23 10 23 10 22 8 22 8 21 6 21 6 20 5 20 5 19 4 19 4 17 3 17 3 15 2 15 2 9 3 9 3 7 4 7 4 5 5 5 5 4 6 4 6 3 8 3 8 2 10 2 10 1 15 1 15 2 13 2 13 3 11 3 11 4 10 4 10 6 9 6 9 8 8 8 8 12 9 12 9 14 10 14 10 16 11 16 11 17 13 17 13 18 15 18 15 19 19 19 19 18 21 18 21 17 22 17" />
  </svg>
);

export const MusicIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M23 1v17h-1v1h-1v1h-4v-1h-1v-1h-1v-3h1v-1h1v-1h3V8h-2v1h-3v1h-4v1H9v10H8v1H7v1H3v-1H2v-1H1v-3h1v-1h1v-1h3V6h2V5h3V4h4V3h3V2h3V1z" />
  </svg>
);

export const MutedIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M23 1v17h-1v1h-1v1h-4v-1h-1v-1h-1v-3h1v-1h1v-1h3V8h-2v1h-3v1h-4v1H9v10H8v1H7v1H3v-1H2v-1H1v-3h1v-1h1v-1h3V6h2V5h3V4h4V3h3V2h3V1z" />
    <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="3" />
  </svg>
);

// export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 23 23"
//     fill="currentColor"
//     shapeRendering="crispEdges"
//     {...props}
//   >
//     <path d="M9 7h5v1H9z M8 8h1v1H8z M14 8h1v1H14z M7 9h1v5H7z M15 9h1v5H15z M8 14h1v1H8z M14 14h1v1H14z M9 15h5v1H9z M11 3h1v3H11z M11 17h1v3H11z M3 11h3v1H3z M17 11h3v1H17z M5 5h1v1H5z M6 6h1v1H6z M17 5h1v1H17z M16 6h1v1H16z M6 16h1v1H6z M5 17h1v1H5z M16 16h1v1H16z M17 17h1v1H17z" />
//   </svg>

// );
export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={28}
    height={28}
    fill="currentColor"
    shapeRendering="crispEdges"
    {...props}
  >
    {/* 2px 粗的太阳圆环 */}
    <path
      fillRule="evenodd"
      d="
        M10 8h4v1h1v1h1v4h-1v1h-1v1h-4v-1H9v-1H8v-4h1V9h1V8z
        M10 10v4h4v-4h-4z
      "
    />

    {/* 2px 粗的上下左右光线 */}
    <path
      d="
      M11 2h2v4h-2z
      M11 18h2v4h-2z
      M2 11h4v2H2z
      M18 11h4v2h-4z
    "
    />

    {/* 2px 粗的斜向光线 */}
    <path
      d="
      M4 4h2v2H4z
      M6 6h2v2H6z

      M18 4h2v2h-2z
      M16 6h2v2h-2z

      M4 18h2v2H4z
      M6 16h2v2H6z

      M18 18h2v2h-2z
      M16 16h2v2h-2z
    "
    />
  </svg>
);
