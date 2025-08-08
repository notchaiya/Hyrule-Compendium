// import React from "react";
import Card, { type CompendiumEntry } from "./Card.jsx";

type CardContainerProps = {
  entries: CompendiumEntry[];
  currentPage: number;
  totalPage: number;
  setPage: (page: number) => void;
};

function CardContainer({
  entries,
  currentPage,
  totalPage,
  setPage,
}: CardContainerProps) {
  function Pagination() {
    let pages = [];
    for (let i = 0; i < totalPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center my-5">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => setPage(page)}
            className={`mx-1 px-2 font-medium ${
              currentPage == page ? "bg-blue-400" : "bg-gray-100"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Pagination />
      <div className="grid grid-cols-1 px-18 py-4 md:grid-cols-4 gap-6">
        {entries?.map((entry) => (
          <Card entry={entry} key={entry.id} />
        ))}
      </div>
    </div>
  );
}

export default CardContainer;
