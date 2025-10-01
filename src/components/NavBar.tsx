import { NavLink, useMatch } from "react-router-dom";
import Logo from "./Logo.js";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import {
  HeartIcon as OutlineHeart,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import Filter from "./Filter.jsx";
import { useTheme } from "../hooks/useTheme.js";

export type SelectCategory = {
  onSelect: (filterBy: string) => void;
};

function NavBar({ onSelect }: SelectCategory) {
  const { theme, toggleTheme } = useTheme();
  const isFavoritesActive = !!useMatch("/favorites");

  return (
    <div className="p-4 ">
      <nav className=" flex w-full items-center justify-between px-6 py-3 border-4 dark:border-dark-font border-black rounded-4xl shadow-md  bg-light-bg dark:bg-dark-card">
        <Logo />
        {!isFavoritesActive && <Filter onSelect={onSelect} />}
        <div className="flex flex-row gap-x-0.5">
          <NavLink to="/favorites">
            {({ isActive }) => (
              <div className="w-8 h-8">
                {isActive ? (
                  <SolidHeart className="size-full text-black dark:invert" />
                ) : (
                  <OutlineHeart className="size-full text-black dark:invert" />
                )}
              </div>
            )}
          </NavLink>
          {theme === "dark" ? (
            <MoonIcon
              className="w-8 h-8 dark:invert hover:cursor-pointer"
              onClick={toggleTheme}
            />
          ) : (
            <SunIcon
              className="w-8 h-8 hover:cursor-pointer"
              onClick={toggleTheme}
            />
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
