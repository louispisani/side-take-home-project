
import { Listing } from "../types/listing";
import PropertyCard from "./PropertyCard";

interface Props {
  listings: Listing[];
  favorites: number[];
  onToggleFavorite: (
    mlsId: number
  ) => void;
}

export default function PropertyList({
  listings,
  favorites,
  onToggleFavorite,
}: Props) {
  return (
    <>
      {listings.map((listing) => (
        <PropertyCard
          key={listing.mlsId}
          listing={listing}
          favorited={favorites.includes(
            listing.mlsId
          )}
          onToggleFavorite={
            onToggleFavorite
          }
        />
      ))}
    </>
  );
}