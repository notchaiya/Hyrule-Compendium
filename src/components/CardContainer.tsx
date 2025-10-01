// import React from "react";
import Card, { type CompendiumEntry } from "./Card.jsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
type CardContainerProps = {
  entries: CompendiumEntry[];
  currentPage: number;
  totalPage: number;

  setPage: (page: number) => void;
};

type PaginationProps = {
  currentPage: number;
  totalPage: number;

  setPage: (page: number) => void;
};

function Pagination({
  currentPage,
  totalPage,

  setPage,
}: PaginationProps) {
  return (
    <div className="flex w-full justify-center pb-3">
      <div className="w-10 h-10 items-center justify-center rounded-l-3xl bg-pagination-bg hover:bg-pagination-hover text-white">
        <ChevronLeftIcon
          className="p-1"
          onClick={() => setPage(currentPage - 1)}
        />
      </div>

      <div className="w-10 h-10 flex items-center justify-center bg-pagination-bg hover:bg-pagination-hover font-semibold text-white dark:text-gray-300">
        {currentPage > 1 ? currentPage - 1 : ""}
      </div>
      <div className="w-10 h-10 flex items-center justify-center bg-pagination-currentPage-bg hover:bg-pagination-hover font-semibold text-white dark:text-gray-300">
        {currentPage}
      </div>

      <div className="w-10 h-10 flex items-center justify-center  bg-pagination-bg hover:bg-pagination-hover font-semibold text-white dark:text-gray-300">
        {currentPage === totalPage ? "" : currentPage + 1}
      </div>

      <div className="w-10 h-10 items-center justify-center rounded-r-3xl bg-pagination-bg hover:bg-pagination-hover text-white">
        <ChevronRightIcon
          className="p-1"
          onClick={() => setPage(currentPage + 1)}
        />
      </div>
    </div>
  );
}

function CardContainer({
  entries,
  currentPage,
  setPage,
  totalPage,
}: CardContainerProps) {
  return (
    <div>
      <div className="grid grid-cols-1 px-18 py-4 md:grid-cols-4 gap-6">
        {entries?.map((entry) => (
          <Card entry={entry} key={entry.id} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        setPage={setPage}
      />
    </div>
  );
}

export default CardContainer;
