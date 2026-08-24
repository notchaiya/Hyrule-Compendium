import { useMatch, useNavigate } from "react-router-dom";
import Logo from "./Logo.js";
import { OutlineHeartIcon, SolidHeartIcon, SunIcon, MoonIcon, MusicIcon, MutedIcon } from "./Icons.js";
import { useContext } from "react";
import { AudioContext } from "../context/AudioContext.js";
import Filter from "./Filter.jsx";
import SearchBar from "./SearchBar.js";
import { useTheme } from "../hooks/useTheme.js";

export type SelectCategory = {
    onSelect: (filterBy: string) => void;
    activeCategory?: string;
};

function NavBar({ onSelect, activeCategory }: SelectCategory) {
    const { theme, toggleTheme } = useTheme();
    const isFavoritesActive = !!useMatch("/favorites");
    const audioContext = useContext(AudioContext);
    const navigate = useNavigate();

    const handleHeartClick = () => {
        if (isFavoritesActive) {
            navigate("/");
        } else {
            navigate("/favorites");
        }
    };

    return (
        <div className="p-4">
            <nav className="flex w-full items-center justify-between px-6 py-3 border-4 dark:border-dark-font border-black rounded-4xl shadow-md bg-light-bg dark:bg-dark-card gap-4">
                <Logo />
                
                <div className="flex flex-1 justify-center items-center gap-2 md:gap-4">
                    <SearchBar />
                    {!isFavoritesActive && <Filter onSelect={onSelect} activeCategory={activeCategory} />}
                </div>

                <div className="flex flex-row gap-x-0.5 items-center">
                    <div onClick={handleHeartClick} className="w-8 h-8 hover:cursor-pointer flex items-center justify-center" title={isFavoritesActive ? "Go back to Home" : "View Favorites"}>
                        {isFavoritesActive ? (
                            <SolidHeartIcon className="size-full text-black dark:invert" />
                        ) : (
                            <OutlineHeartIcon className="size-full text-black dark:invert" />
                        )}
                    </div>
                    <div className="w-8 h-8 hover:cursor-pointer flex items-center justify-center" onClick={() => audioContext?.toggleMusic()} title="Toggle Music">
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
                            title="Toggle Light Theme"
                        />
                    ) : (
                        <SunIcon
                            className="w-8 h-8 hover:cursor-pointer"
                            onClick={toggleTheme}
                            title="Toggle Dark Theme"
                        />
                    )}
                </div>
            </nav>
        </div>
    );
}

export default NavBar;

