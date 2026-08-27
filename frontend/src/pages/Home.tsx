import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import CardContainer from "../components/CardContainer.jsx";
import { usePagination } from "../hooks/usePagination.js";
import type { CompendiumEntry } from "../components/Card.js";
import { CardSkeleton } from "../components/CardSkeleton.js";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "monsters";
  const searchQuery = searchParams.get("search") || "";

  const [zeldaEntries, setZeldaEntries] = useState<CompendiumEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredEntries = useMemo(() => {
    return zeldaEntries.filter((entry) =>
      entry.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [zeldaEntries, searchQuery]);

  const {
    currentPage,
    currentEntries,

    totalPage,
    handleSetPage,
  } = usePagination({ entries: filteredEntries, itemsPerPage: 8 });

  function handleCategoryChange(selected: string) {
    setSearchParams({ category: selected, search: "" });
  }

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/hyrule/category/${category}`);
          console.log("loading");
          if (!res.ok) {
            throw new Error("Something went wrong when fetching!");
          }
          const data = await res.json();
          setZeldaEntries(data);
          setIsLoading(false);
          console.log("loaded");
          console.log(data);
        } catch (error) {
          console.error("Fetch failed: ", error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    },
    [category]
  );

  return (
    <div>
      <NavBar onSelect={handleCategoryChange} activeCategory={category} />
      {isLoading ? (
        <div className="grid grid-cols-1 px-18 py-4 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4 font-pixel text-light-font dark:text-dark-font">
          <p className="text-sm md:text-base mb-4">No entries found matching "{searchQuery}"</p>
          <button
            onClick={() => setSearchParams({ category })}
            className="border-4 border-black bg-gray-200 dark:bg-dark-button px-4 py-2 hover:bg-highlight-blue cursor-pointer dark:text-dark-font text-xs"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <CardContainer
          entries={currentEntries}
          setPage={handleSetPage}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      )}
    </div>
  );
}
