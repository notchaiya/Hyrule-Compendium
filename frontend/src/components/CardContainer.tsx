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
    <div className="flex w-full justify-center pb-3 select-none" aria-label="Pagination">
      <div className="w-10 h-10 flex items-center justify-center rounded-l-3xl bg-pagination-bg dark:bg-dark-pagination-bg hover:bg-pagination-hover dark:hover:bg-dark-pagination-hover text-light-pagination-font dark:text-dark-pagination-font hover:cursor-pointer" onClick={() => setPage(currentPage - 1)}>
        <ChevronLeftIcon className="p-1 w-full h-full" />
      </div>

      <div className="w-10 h-10 flex items-center justify-center bg-pagination-bg dark:bg-dark-pagination-bg hover:bg-pagination-hover dark:hover:bg-dark-pagination-hover font-pixel text-xs text-light-pagination-font dark:text-dark-pagination-font hover:cursor-pointer" onClick={() => currentPage > 1 && setPage(currentPage - 1)}>
        {currentPage > 1 ? currentPage - 1 : ""}
      </div>
      <div className="w-10 h-10 flex items-center justify-center bg-pagination-currentPage-bg dark:bg-dark-pagination-currentPage-bg font-pixel text-xs text-light-pagination-font dark:text-dark-pagination-font">
        {currentPage}
      </div>

      <div className="w-10 h-10 flex items-center justify-center bg-pagination-bg dark:bg-dark-pagination-bg hover:bg-pagination-hover dark:hover:bg-dark-pagination-hover font-pixel text-xs text-light-pagination-font dark:text-dark-pagination-font hover:cursor-pointer" onClick={() => currentPage < totalPage && setPage(currentPage + 1)}>
        {currentPage === totalPage ? "" : currentPage + 1}
      </div>

      <div className="w-10 h-10 flex items-center justify-center rounded-r-3xl bg-pagination-bg dark:bg-dark-pagination-bg hover:bg-pagination-hover dark:hover:bg-dark-pagination-hover text-light-pagination-font dark:text-dark-pagination-font hover:cursor-pointer" onClick={() => setPage(currentPage + 1)}>
        <ChevronRightIcon className="p-1 w-full h-full" />
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
      <div className="grid grid-cols-1 px-30 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {entries?.map((entry) => (
          <Card entry={entry} key={entry.id} />
        ))}
      </div>

      {totalPage > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default CardContainer;
