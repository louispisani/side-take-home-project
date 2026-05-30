import { useEffect, useState } from "react";
import {
  getStorage,
  setStorage,
} from "../lib/localStorage";

const STORAGE_KEY = "favorites";

export function useFavorites() {
  const [favorites, setFavorites] =
    useState<number[]>([]);

  useEffect(() => {
    setFavorites(
      getStorage<number[]>(
        STORAGE_KEY,
        []
      )
    );
  }, []);

  const toggleFavorite = (
    mlsId: number
  ) => {
    const updated = favorites.includes(
      mlsId
    )
      ? favorites.filter(
          (id) => id !== mlsId
        )
      : [...favorites, mlsId];

    setFavorites(updated);

    setStorage(
      STORAGE_KEY,
      updated
    );
  };

  return {
    favorites,
    toggleFavorite,
  };
}