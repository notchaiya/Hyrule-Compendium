import { createContext, useEffect, useState, type ReactNode } from "react";
import { type CompendiumEntry } from "../components/Card.js";
interface FavoritesContextValue {
  favorites: CompendiumEntry[];
  toggleFavorites: (item: CompendiumEntry) => void;
  isFavorites: (id: number) => boolean;
}

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);
const getInitialFavorites = (): CompendiumEntry[] => {
  const savedFavorites = localStorage.getItem("favorites");
  if (savedFavorites) {
    return JSON.parse(savedFavorites);
  } else {
    return [];
  }
};
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] =
    useState<CompendiumEntry[]>(getInitialFavorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorites = (item: CompendiumEntry) => {
    setFavorites((prevItems) => {
      if (prevItems.some((prevItems) => prevItems.id == item.id)) {
        return prevItems.filter((prevItems) => prevItems.id !== item.id);
      } else {
        console.log("hey, new favorite added!");
        return [...prevItems, item];
      }
    });
  };

  const isFavorites = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  const value = {
    toggleFavorites,
    isFavorites,
    favorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
