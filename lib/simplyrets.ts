import { Listing } from "../types/listing";

export async function getListings(): Promise<Listing[]> {
  const response = await fetch("/api/listings");

  if (!response.ok) {
    throw new Error("Failed to fetch listings");
  }

  return response.json();
}