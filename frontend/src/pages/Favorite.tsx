import { useContext } from "react";
import NavBar from "../components/NavBar.jsx";
import { FavoritesContext } from "../context/FavoritesContext.js";
import CardContainer from "../components/CardContainer.js";
import { usePagination } from "../hooks/usePagination.js";

export default function Favorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("Error!");

  const { favorites } = context;
  const {
    currentPage,
    currentEntries,

    totalPage,
    handleSetPage,
  } = usePagination({ entries: favorites, itemsPerPage: 8 });

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
