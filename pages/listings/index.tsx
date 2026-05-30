import { useCallback, useMemo, useState } from "react";
import Header from "../../components/Header";
import PropertyList from "../../components/PropertyList";
import PropertyMap from "../../components/PropertyMap";
import { useListings } from "../../hooks/useListings";
import { useFavorites } from "../../hooks/useFavorites";
import styles from "../../styles/listings.module.css";

export default function Listings() {
  const { listings, loading, error } = useListings();
  const { favorites, toggleFavorite } = useFavorites();

  const [mapBounds, setMapBounds] =
    useState<google.maps.LatLngBounds | null>(null);

  const [mobileView, setMobileView] =
    useState<"list" | "map">("list");

  const validListings = useMemo(() => {
    return listings.filter(
      (listing) => listing?.geo?.lat && listing?.geo?.lng
    );
  }, [listings]);

  // Filter listings to only properties visible within current map bounds
  const visibleListings = useMemo(() => {
    if (!mapBounds) {
      return validListings;
    }

    return validListings.filter((listing) =>
      mapBounds.contains({
        lat: listing.geo.lat,
        lng: listing.geo.lng,
      })
    );
  }, [validListings, mapBounds]);

  const handleBoundsChange = useCallback(
    (bounds: google.maps.LatLngBounds | null) => {
      setMapBounds(bounds);
    },
    []
  );

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>Unable to load properties.</div>;

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.layout}>
        <section
          className={`${styles.map} ${
            mobileView === "map" ? styles.mobileVisible : styles.mobileHidden
          }`}
        >
          <PropertyMap
            listings={validListings}
            onBoundsChange={handleBoundsChange}
          />
        </section>
        
        <section className={styles.list}>
          {visibleListings.length === 0 ? (
            <div className={styles.emptyState}>
              Zoom out or move the map to see more properties.
            </div>
          ) : (
            <PropertyList
              listings={visibleListings}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </section>

        <button
          type="button"
          className={styles.mobileToggle}
          onClick={() =>
            setMobileView((current) => (current === "list" ? "map" : "list"))
          }
        >
          {mobileView === "list" ? "MAP VIEW" : "LIST VIEW"}
        </button>
      </main>
    </div>
  );
}