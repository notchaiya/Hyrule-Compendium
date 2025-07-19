import { NavLink, useMatch } from "react-router-dom";
import Logo from "./Logo";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import Filter from "./Filter";

function NavBar({ onSelect }) {
  const isFavoritesActive = !!useMatch("/favorites");

  return (
    <div className="p-4">
      <nav className="flex w-full items-center justify-between px-6 py-3 border-4 border-black rounded-4xl shadow-md">
        <Logo />
        {!isFavoritesActive && <Filter onSelect={onSelect} />}
        <NavLink to="/favorites">
          {({ isActive }) => (
            <span className="flex items-center justify-center w-8 h-8 mr-1">
              {isActive ? (
                <SolidHeart className="size-full text-black" />
              ) : (
                <OutlineHeart className="size-full text-black" />
              )}
            </span>
          )}
        </NavLink>
      </nav>
    </div>
  );
}

export default NavBar;
