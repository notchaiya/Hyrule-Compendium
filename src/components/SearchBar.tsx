import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import type { CompendiumEntry } from "./Card.js";

const CATEGORIES = [
  "monsters",
  "creatures",
  "equipment",
  "materials",
  "treasure",
];

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [allEntries, setAllEntries] = useState<CompendiumEntry[]>([]);
  const [query, setQuery] = useState("");
  const [typedQuery, setTypedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Prefetch all entries on mount for local fast searching
  useEffect(() => {
    let isMounted = true;
    async function loadAllEntries() {
      try {
        const allData = await Promise.all(
          CATEGORIES.map(async (cat) => {
            const res = await fetch(
              `http://localhost:3000/api/hyrule/category/${cat}`,
            );
            if (!res.ok) throw new Error(`Failed to fetch ${cat}`);
            return res.json();
          }),
        );
        if (isMounted) {
          setAllEntries(allData.flat());
        }
      } catch (err) {
        console.error("Error prefetching search entries:", err);
      }
    }
    loadAllEntries();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync search input value with URL search params
  const currentSearchParam = searchParams.get("search") || "";
  useEffect(() => {
    setQuery(currentSearchParam);
    setTypedQuery(currentSearchParam);
  }, [currentSearchParam]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter recommendations based on what user typed
  const recommendations = typedQuery.trim()
    ? allEntries
        .filter((entry) =>
          entry.name.toLowerCase().includes(typedQuery.toLowerCase()),
        )
        .slice(0, 8)
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setTypedQuery(val);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  // Perform search navigation
  const executeSearch = (searchTerm: string, categoryOfItem?: string) => {
    setIsOpen(false);

    // Find the category of the item if not provided
    let targetCategory = categoryOfItem;
    if (!targetCategory && searchTerm.trim()) {
      const match = allEntries.find(
        (entry) => entry.name.toLowerCase() === searchTerm.toLowerCase(),
      );
      if (match) {
        targetCategory = match.category;
      } else {
        // Fallback: search for first partial match in allEntries
        const partialMatch = allEntries.find((entry) =>
          entry.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        if (partialMatch) {
          targetCategory = partialMatch.category;
        }
      }
    }

    // Default target category to current URL param or monsters
    const finalCategory =
      targetCategory || searchParams.get("category") || "monsters";

    // If searching, we navigate to home page / with the query params
    if (searchTerm.trim()) {
      navigate(
        `/?category=${finalCategory}&search=${encodeURIComponent(searchTerm)}`,
      );
    } else {
      // If empty query, clear search param and stay on current category
      navigate(`/?category=${finalCategory}`);
    }
  };

  const handleSelectRecommendation = (entry: CompendiumEntry) => {
    setQuery(entry.name);
    setTypedQuery(entry.name);
    executeSearch(entry.name, entry.category);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || recommendations.length === 0) {
      if (e.key === "Enter") {
        executeSearch(query);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex =
        ((highlightedIndex + 1) % (recommendations.length + 1)) - 1; // range: -1 to recommendations.length - 1
      setHighlightedIndex(nextIndex);
      if (nextIndex === -1) {
        setQuery(typedQuery);
      } else {
        setQuery(recommendations[nextIndex].name);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        highlightedIndex === -1
          ? recommendations.length - 1
          : highlightedIndex - 1;
      setHighlightedIndex(prevIndex);
      if (prevIndex === -1) {
        setQuery(typedQuery);
      } else {
        setQuery(recommendations[prevIndex].name);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < recommendations.length) {
        handleSelectRecommendation(recommendations[highlightedIndex]);
      } else {
        executeSearch(query);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleClear = () => {
    setQuery("");
    setTypedQuery("");
    setIsOpen(false);
    setHighlightedIndex(-1);

    // Clear search param in URL (navigate back to home page with current category)
    const currentCategory = searchParams.get("category") || "monsters";
    navigate(`/?category=${currentCategory}`);
  };

  return (
    <div
      className="relative flex-1 max-w-[160px] xs:max-w-[200px] sm:max-w-xs md:max-w-sm"
      ref={dropdownRef}
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search items..."
          className="w-full bg-light-card dark:bg-dark-card border-4 border-black px-3 py-1.5 pr-8 outline-none font-pixel text-[10px] md:text-xs shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.2),inset_2px_2px_0_rgba(255,255,255,0.4)] placeholder:text-black/50 dark:placeholder:text-white/50 text-light-font dark:text-dark-font focus:border-highlight-blue transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 font-pixel text-[10px] md:text-xs hover:text-red-500 cursor-pointer text-light-font dark:text-dark-font"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && recommendations.length > 0 && (
        <div className="absolute top-full mt-2 left-0 w-full z-50 bg-light-card dark:bg-dark-card border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] flex flex-col py-1 max-h-60 overflow-y-auto scrollbar-retro">
          {recommendations.map((entry, index) => {
            const isHighlighted = index === highlightedIndex;
            return (
              <button
                key={entry.id}
                onClick={() => handleSelectRecommendation(entry)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`text-left px-3 py-2 flex items-center gap-3 border-b-2 last:border-0 border-black/10 dark:border-white/10 w-full cursor-pointer transition-colors ${
                  isHighlighted
                    ? "bg-highlight-blue text-black dark:bg-highlight-blue dark:text-black"
                    : "text-light-font dark:text-dark-font hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <img
                  src={entry.image}
                  alt={entry.name}
                  className="w-8 h-8 object-contain border-2 border-black bg-white shrink-0 image-rendering-pixelated"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-pixel text-[9px] md:text-[10px] truncate capitalize">
                    {entry.name}
                  </span>
                  <span className="font-body text-xs opacity-60 capitalize">
                    {entry.category}
                  </span>
                </div>
                {isHighlighted && (
                  <span className="font-pixel text-[8px] ml-auto">▶</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
