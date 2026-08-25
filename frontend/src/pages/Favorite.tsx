import { useContext, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import { FavoritesContext } from "../context/FavoritesContext.js";
import CardContainer from "../components/CardContainer.js";
import { usePagination } from "../hooks/usePagination.js";

export default function Favorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("Error!");
  // const [currentPage, setCurrentPage] = useState(1);

  const { favorites } = context;
  const {
    currentPage,
    currentEntries,

    totalPage,
    handleSetPage,
  } = usePagination({ entries: favorites, itemsPerPage: 8 });

  // function handleSetPage(selectedPage: number) {
  //   setCurrentPage(selectedPage);
  // }
  // const piecesPerPage = 8;

  // const currentEntries = favorites.slice(
  //   currentPage * piecesPerPage,
  //   currentPage * piecesPerPage + piecesPerPage
  // );
  // const totalPage = Math.ceil(favorites.length / piecesPerPage);
  return (
    <div>
      <NavBar onSelect={() => { }} />
      {favorites.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh] text-2xl font-pixel dark:text-dark-font text-center px-4">
          You haven't added any favorites yet!
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
