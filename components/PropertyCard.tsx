import Image from "next/image";
import styles from "../styles/listings.module.css";
import { Listing } from "../types/listing";
import { formatListDate, getBaths } from "../util/formatting";

interface Props {
  listing: Listing;
  favorited: boolean;
  onToggleFavorite: (mlsId: number) => void;
}

export default function PropertyCard({
  listing,
  favorited,
  onToggleFavorite,
}: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={listing.photos?.[0]}
          alt={listing.address.full ?? "Property photo"}
          className={styles.image}
          width={301}
          height={209}
        />

        <button
          type="button"
          className={styles.favorite}
          onClick={() => onToggleFavorite(listing.mlsId)}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <img
            src={favorited ? "/heart-fill.svg" : "/heart-stroke.svg"}
            alt=""
            className={styles.favoriteIcon}
          />
        </button>
      </div>

      <div className={styles.meta}>
        {listing.property.bedrooms} BR | {getBaths(listing)} Bath |{" "}
        {listing.property.area.toLocaleString()} Sq Ft
      </div>

      <div className={styles.price}>
        ${listing.listPrice.toLocaleString()}
      </div>

      <div className={styles.address}>{listing.address.full}</div>

      <div className={styles.date}>Listed: {formatListDate(listing.listDate)}</div>
    </article>
  );
}