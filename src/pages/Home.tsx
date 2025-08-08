import { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import CardContainer from "../components/CardContainer.jsx";

export default function Home() {
  // category change + data
  const [zeldaEntries, setZeldaEntries] = useState([]);
  const [category, setCategory] = useState("monsters");
  // pagination
  const [currentPage, setCurrentPage] = useState(0);

  function handleCategoryChange(selected: string) {
    setCategory(selected);
    setCurrentPage(0);
  }

  function handleSetPage(selectedPage: number) {
    setCurrentPage(selectedPage);
  }
  useEffect(
    function () {
      async function fetchData() {
        const res = await fetch(
          `https://botw-compendium.herokuapp.com/api/v3/compendium/category/${category}`
        );
        if (!res.ok) {
          throw new Error("Something went wrong when fetching!");
        }
        const data = await res.json();
        console.log(data);
        setZeldaEntries(data.data);
      }
      fetchData();
    },
    [category]
  );

  const piecesPerPage = 8;
  const currentEntries = zeldaEntries.slice(
    currentPage * piecesPerPage,
    currentPage * piecesPerPage + piecesPerPage
  );

  const totalPage = Math.ceil(zeldaEntries.length / piecesPerPage);

  return (
    <>
      <NavBar onSelect={handleCategoryChange} />
      <CardContainer
        // key={currentEntries.id}
        entries={currentEntries}
        setPage={handleSetPage}
        currentPage={currentPage}
        totalPage={totalPage}
      />
    </>
  );
}
