import { NavLink, useMatch } from "react-router-dom";
import Logo from "./Logo.js";
import { OutlineHeartIcon, SolidHeartIcon, SunIcon, MoonIcon, MusicIcon, MutedIcon } from "./Icons.js";
import { useContext } from "react";
import { AudioContext } from "../context/AudioContext.js";
import Filter from "./Filter.jsx";
import { useTheme } from "../hooks/useTheme.js";

export type SelectCategory = {
    onSelect: (filterBy: string) => void;
};

function NavBar({ onSelect }: SelectCategory) {
    const { theme, toggleTheme } = useTheme();
    const isFavoritesActive = !!useMatch("/favorites");
    const audioContext = useContext(AudioContext);

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
                                    <SolidHeartIcon className="size-full text-black dark:invert" />
                                ) : (
                                    <OutlineHeartIcon className="size-full text-black dark:invert" />
                                )}
                            </div>
                        )}
                    </NavLink>
                    <div className="w-8 h-8 hover:cursor-pointer flex items-center justify-center" onClick={() => audioContext?.toggleMusic()}>
                        {audioContext?.isPlaying ? (
                            <MusicIcon className="size-full text-black dark:invert" />
                        ) : (
                            <MutedIcon className="size-full text-black dark:invert" />
                        )}
                    </div>
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

