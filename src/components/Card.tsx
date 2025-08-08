import { useState } from "react";
import Description from "./Description.jsx";

export type CompendiumEntry = {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  common_locations: string[] | null;
  drops: string[] | null;
  dlc: boolean;
};

type CardProps = {
  entry: CompendiumEntry;
};
function Card({ entry }: CardProps) {
  const [isOpened, setIsOpened] = useState(false);

  function handleSetExpanded() {
    setIsOpened(true);
    console.log(isOpened);
  }
  const { category, common_locations, description, dlc, image, name } = entry;

  const locations = formatLocations(common_locations);
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
          className="mt-auto bg-gray-200  border-2 rounded-xl px-4 hover:bg-highlight-blue"
        >
          Show More<span aria-hidden="true">+</span>
        </button>
      </div>

      {isOpened && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center "
            onClick={() => setIsOpened(false)}
          >
            <div
              className="flex md:flex-row flex-col 
              items-center bg-white z-50 
              relative max-w-lg rounded-2xl shadow-lg "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 w-6 h-6 hover:bg-highlight-blue flex items-center justify-center rounded-full  border-2 border-black"
                onClick={() => setIsOpened(false)}
              >
                ✕
              </button>
              <div className="flex flex-col items-center ml-2.5">
                <img
                  src={image}
                  alt={name}
                  className="rounded-2xl mt-4 w-10/12 md:w-11/12"
                />
                <h3 className="capitalize font-serif font-bold  mt-3 ">
                  {name}
                </h3>
                <p className="mt-3 font-serif font-ligh">
                  Category : {category}
                </p>
              </div>
              <div className="m-3 md:m-7 flex flex-col gap-y-3 md:gap-y-7 w-2/3 md:items-start items-center">
                <h4 className="w-3/4">{locations}</h4>
                <p className="text-center md:text-start">{description}</p>
                <p className="">{dlc ? "DLC only" : "Not DLC-only"}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function formatLocations(locationArray: string[] | null) {
  let location_string = " ";
  if (!Array.isArray(locationArray)) {
    return " ";
  }

  if (locationArray.length > 1) {
    location_string = locationArray.join(", ");
    return location_string;
  } else {
    return locationArray;
  }
}

export default Card;
