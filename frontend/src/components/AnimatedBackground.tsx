import React from "react";
import { useTheme } from "../hooks/useTheme.js";
import lightBg from "../assets/zelda_pixel_background.svg";
import darkBg from "../assets/zelda_pixel_background_night.svg";

export const AnimatedBackground = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {theme === "light" ? (
        <div
          className="absolute inset-0 z-0 fixed top-0 left-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url(${lightBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated"
          }}
        />
      ) : (
        <div
          className="absolute inset-0 z-0 fixed top-0 left-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url(${darkBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated"
          }}
        >

        </div>
      )}

      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};
