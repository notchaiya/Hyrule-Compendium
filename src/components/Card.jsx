import { useState } from "react";

function Card({ entry }) {
  const [isOpened, setIsOpened] = useState(false);

  function handleSetExpanded() {
    setIsOpened(true);
    console.log(isOpened);
  }
  const { category, common_locations, description, dlc, image, name } = entry;

  const locations = common_locations;
  return (
    <>
      <div className="bg-gray-200 shadow-gray-500 shadow-sm overflow-hidden rounded-lg flex flex-col p-4 items-center">
        <img src={image} className="rounded-lg hover:scale-105 duration-300" />
        <h3 className="font-serif text-xl text-center font-bold capitalize pt-4">
          {name}
        </h3>
        <p className=" font-serif font-bold text-sm text-center py-2">
          {locations}
        </p>
        <Description str={description} />
        <button
          onClick={handleSetExpanded}
          className="mt-auto bg-gray-200  border-2 rounded-xl px-4 hover:bg-blue-400"
        >
          Show More<span aria-hidden="true">+</span>
        </button>
      </div>

      {isOpened && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpened(false)}
          >
            <div className=" fixed inset-0 flex items-center justify-center z-50">
              <div
                className="flex p-5 relative flex-col items-center space-y-2 bg-white rounded-xl shadow-lg max-w-lg w-11/1 2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute right-4 top-4 border-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-400"
                  onClick={() => setIsOpened(false)}
                >
                  ✕
                </button>

                <img src={image} alt={name} className="rounded-3xl mt-8" />
                <div className="w-full text-center space-y-2">
                  <h3 className="capitalize font-serif text-xl font-bold">
                    {name}
                  </h3>
                  <h4 className="font-serif text-sm font-bold">{locations}</h4>
                  <p className="capitalize pt-4">Category : {category}</p>
                  <p>{description}</p>
                  <p className="text-gray-400">
                    {dlc ? "DLC only" : "Not DLC-only"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Description({ str }) {
  const wordCount = 40;
  const words = str.split(/\s+/);
  const isLong = words.length > wordCount;

  const truncatedText = isLong ? words.slice(0, wordCount).join(" ") : str;

  return (
    <p className="mb-3 mx-3">
      {truncatedText}...
      {/* <button onClick={() => setIsExpended((prev) => !prev)}>show more</button> */}
    </p>
  );
}

function formatLocations({ locations }) {}
export default Card;
