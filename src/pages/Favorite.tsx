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
    <div className="dark:bg-dark-bg bg-light-bg min-h-screen">
      <NavBar onSelect={() => {}} />
      <CardContainer
        entries={currentEntries}
        setPage={handleSetPage}
        currentPage={currentPage}
        totalPage={totalPage}
      />
      {/* <div className="grid grid-cols-1 px-18 py-4 md:grid-cols-4 gap-6">
        {favorites?.map((favorite) => (
          <Card entry={favorite} key={favorite.id} />
        ))}
      </div> */}
    </div>
  );
}
