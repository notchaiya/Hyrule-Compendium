import { useContext, useState } from "react";
import Description from "./Description.jsx";
import { OutlineHeartIcon, SolidHeartIcon } from "./Icons.js";
import { FavoritesContext } from "../context/FavoritesContext.js";

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
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("Error!");
  const { toggleFavorites, isFavorites } = context;
  const [isOpened, setIsOpened] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(true);

  function handleSetExpanded() {
    setIsOpened(true);
    console.log(isOpened);
  }
  const {
    category,
    common_locations,
    description,
    dlc,
    image,
    name,
    id,
    drops,
  } = entry;

  const locations = formatLocations(common_locations);

  return (
    <>
      <div className="retro-panel overflow-hidden flex flex-col p-4 items-center">
        <div className="relative aspect-square w-full">
          {isImgLoading && (
            <div className=" bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
          )}
          <img
            src={image}
            alt={name}
            className="w-full transition-transform duration-400 hover:scale-104 cursor-pointer"
            onLoad={() => setIsImgLoading(false)}
          />

          {isFavorites(id) ? (
            <SolidHeartIcon
              className="hover:scale-110 duration-100 absolute top-2 right-2 p-1 w-8 text-red-600 bg-light-card border-2 border-black hover:cursor-pointer"
              onClick={() => toggleFavorites(entry)}
            />
          ) : (
            <OutlineHeartIcon
              className="hover:scale-110 duration-100 absolute top-2 right-2 p-1 w-8 text-black bg-light-card border-2 border-black hover:cursor-pointer"
              onClick={() => toggleFavorites(entry)}
            />
          )}
        </div>
        <h3 className="font-pixel text-lg text-center capitalize pt-4 text-light-font dark:text-dark-font">
          {name}
        </h3>
        <p className="font-body text-lg text-center py-2 text-light-font dark:text-dark-font">
          {locations}
        </p>
        <Description str={description} />
        <button
          onClick={handleSetExpanded}
          className="mt-auto border-4 border-black bg-gray-200 dark:bg-dark-button px-4 py-1 hover:bg-highlight-blue dark:text-dark-font font-pixel text-xs"
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
              items-center z-50 
              relative max-w-lg retro-panel p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 w-8 h-8 hover:bg-highlight-blue flex items-center justify-center border-4 border-black bg-light-bg text-black font-pixel text-xs"
                onClick={() => setIsOpened(false)}
              >
                ✕
              </button>
              <div className="flex flex-col items-center ml-2.5">
                <img
                  src={image}
                  alt={name}
                  className="mt-4 w-10/12 md:w-11/12 border-4 border-black"
                />
                <h3 className="capitalize font-pixel mt-4 text-center text-lg dark:text-dark-font text-light-font ">
                  {name}
                </h3>
                <p className="mt-3 font-body text-lg text-light-font dark:text-dark-font">
                  Category : {category}
                </p>
              </div>
              <div className="m-3 md:m-7 flex flex-col gap-y-3 md:gap-y-7 w-2/3 md:items-start items-center font-body text-lg">
                <h4 className="w-3/4 text-center md:text-start text-light-font dark:text-dark-font">
                  Location: {locations}
                </h4>

                <p className="text-center md:text-start text-light-font dark:text-dark-font">
                  {description}
                </p>
                <p className="text-light-font dark:text-dark-font">
                  {dlc ? "DLC only" : "Not DLC-only"}
                </p>
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
