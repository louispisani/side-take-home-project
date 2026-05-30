import { Listing } from "../types/listing";

export const formatMapPrice = (price: number) => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }

  return `$${Math.round(price / 1000)}K`;
};

export const getBaths = (listing: Listing) => {
  return listing.property.bathsFull + listing.property.bathsHalf * 0.5;
};

export const formatListDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  }).format(new Date(date));
};