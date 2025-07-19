import React from "react";
import Card from "./Card.jsx";
function CardContainer({ entries }) {
  return (
    <div className="grid grid-cols-1 px-18 py-4 md:grid-cols-4 gap-6">
      {entries?.map((entry) => (
        <Card entry={entry} key={entry.id} />
      ))}
    </div>
  );
}

export default CardContainer;
