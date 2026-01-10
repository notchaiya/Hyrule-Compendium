import { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import CardContainer from "../components/CardContainer.jsx";
import { usePagination } from "../hooks/usePagination.js";
import type { CompendiumEntry } from "../components/Card.js";
import { CardSkeleton } from "../components/CardSkeleton.js";

export default function Home() {
  // category change + data
  const [zeldaEntries, setZeldaEntries] = useState<CompendiumEntry[]>([]);
  const [category, setCategory] = useState("monsters");
  const [isLoading, setIsLoading] = useState(true);

  const {
    currentPage,
    currentEntries,

    totalPage,
    handleSetPage,
  } = usePagination({ entries: zeldaEntries, itemsPerPage: 8 });

  function handleCategoryChange(selected: string) {
    setCategory(selected);
  }

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `http://localhost:3000/api/hyrule/category/${category}`
          );
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
    <div className="dark:bg-dark-bg bg-light-bg min-h-screen">
      <NavBar onSelect={handleCategoryChange} />
      {isLoading ? (
        <div className="grid grid-cols-1 px-18 py-4 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <CardContainer
          // key={currentEntries.id}
          entries={currentEntries}
          setPage={handleSetPage}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      )}
    </div>
  );
}
