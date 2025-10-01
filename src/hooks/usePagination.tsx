import { useEffect, useState } from "react";
import type { CompendiumEntry } from "../components/Card.js";
type PaginationProps = {
  entries: CompendiumEntry[];
  itemsPerPage: number;
};
export const usePagination = ({ entries, itemsPerPage }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntries = entries.slice(startIndex, endIndex);
  const totalPage = Math.ceil(entries.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [entries]);

  function handleSetPage(selectedPage: number) {
    if (selectedPage <= 1) {
      setCurrentPage(1);
    } else if (selectedPage > totalPage) {
      setCurrentPage(totalPage);
    } else {
      setCurrentPage(selectedPage);
    }
  }

  return {
    currentPage,
    currentEntries,

    totalPage,
    handleSetPage,
  };
};
