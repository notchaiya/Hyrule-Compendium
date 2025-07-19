import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer.jsx";
import NavBar from "../components/NavBar.jsx";

export default function Home() {
  const [zeldaEntries, setZeldaEntries] = useState([]);
  const [category, setCategory] = useState("monsters");

  function handleCategoryChange(selected) {
    setCategory(selected);
    console.log(category);
  }
  useEffect(
    function () {
      //exception handle还没加
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

  return (
    <>
      <NavBar onSelect={handleCategoryChange} />
      <CardContainer entries={zeldaEntries} />
    </>
  );
}
