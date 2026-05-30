import { useEffect, useState } from "react";
import { getListings } from "../lib/simplyrets";
import {
  getStorage,
  setStorage,
} from "../lib/localStorage";
import { Listing } from "../types/listing";

const CACHE_KEY = "listings";

export function useListings() {
  const [listings, setListings] =
    useState<Listing[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    async function load() {
      try {
        // Use cached listings first to avoid unnecessary API requests
        const cached =
          getStorage<Listing[]>(
            CACHE_KEY,
            []
          );

        if (cached.length) {
          setListings(cached);
          setLoading(false);
          return;
        }

        const results =
          await getListings();

        setListings(results);

        setStorage(
          CACHE_KEY,
          results
        );
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    listings,
    loading,
    error,
  };
}