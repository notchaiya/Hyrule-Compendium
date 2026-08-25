import { useState, useRef, useEffect } from "react";
import type { SelectCategory } from "./NavBar.jsx";

const CATEGORIES = ["monsters", "creatures", "equipment", "materials", "treasure"];

export default function Filter({ onSelect, activeCategory }: SelectCategory) {
    const [isOpen, setIsOpen] = useState(false);
    const selected = activeCategory || CATEGORIES[0];
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (category: string) => {
        onSelect(category);
        setIsOpen(false);
    };

    return (
        <div className="dark:text-dark-font font-pixel text-[10px] md:text-xs flex items-center gap-2" ref={dropdownRef}>
            <span className="hidden md:inline">Filter:</span>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-32 md:w-40 bg-light-card dark:bg-dark-card border-4 border-black px-2 md:px-3 py-1.5 outline-none shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.2),inset_2px_2px_0_rgba(255,255,255,0.4)] capitalize hover:brightness-110 active:shadow-[inset_2px_2px_0_rgba(0,0,0,0.2)]"
                >
                    <span className="truncate">{selected}</span>
                    <span className="ml-2 text-[8px] md:text-[10px]">{isOpen ? '▲' : '▼'}</span>
                </button>
                
                {isOpen && (
                    <div className="absolute top-full mt-1 left-0 w-full z-50 bg-light-card dark:bg-dark-card border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] flex flex-col py-1">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleSelect(cat)}
                                className={`text-left px-2 md:px-3 py-2 capitalize hover:bg-black/10 dark:hover:bg-white/10 flex items-center gap-1 ${
                                    selected === cat ? "bg-black/5 dark:bg-white/5" : ""
                                }`}
                            >
                                <span className={`w-3 text-[8px] md:text-[10px] ${selected === cat ? 'visible' : 'invisible'}`}>
                                  ▶
                                </span>
                                <span>{cat}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
