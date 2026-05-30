import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  GoogleMap,
  OverlayView,
  useLoadScript,
} from "@react-google-maps/api";

import styles from "../styles/listings.module.css";
import { Listing } from "../types/listing";
import { formatMapPrice, getBaths } from "../util/formatting";

interface Props {
  listings: Listing[];
  onBoundsChange: (bounds: google.maps.LatLngBounds | null) => void;
}

export default function PropertyMap({ listings, onBoundsChange }: Props) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  const handleLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;

      const bounds = new google.maps.LatLngBounds();

      listings.forEach((listing) => {
        bounds.extend({
          lat: listing.geo.lat,
          lng: listing.geo.lng,
        });
      });

      if (listings.length > 0) {
        map.fitBounds(bounds);
      }

      onBoundsChange(map.getBounds() ?? null);
    },
    [listings, onBoundsChange]
  );

  const handleIdle = useCallback(() => {
    onBoundsChange(mapRef.current?.getBounds() ?? null);
  }, [onBoundsChange]);

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <GoogleMap
      onLoad={handleLoad}
      onIdle={handleIdle}
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {listings.map((listing) => (
        <OverlayView
          key={listing.mlsId}
          position={{
            lat: listing.geo.lat,
            lng: listing.geo.lng,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <button
            type="button"
            className={styles.priceMarker}
            onClick={() => setSelectedListing(listing)}
            aria-label={`View property ${listing.address.full}`}
          >
            {formatMapPrice(listing.listPrice)}
          </button>
        </OverlayView>
      ))}

      {selectedListing && (
        <OverlayView
          position={{
            lat: selectedListing.geo.lat,
            lng: selectedListing.geo.lng,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className={styles.mapPopup}>
            <button
              type="button"
              className={styles.mapPopupClose}
              onClick={() => setSelectedListing(null)}
              aria-label="Close property preview"
            >
              ×
            </button>

            <div className={styles.mapPopupImageWrapper}>
              <Image
                src={selectedListing.photos?.[0]}
                alt={selectedListing.address.full ?? "Property photo"}
                className={styles.mapPopupImage}
                width={280}
                height={160}
              />
            </div>

            <div className={styles.mapPopupBody}>
              <div className={styles.mapPopupMeta}>
                {selectedListing.property.bedrooms} BR |{" "}
                {getBaths(selectedListing)} Bath |{" "}
                {selectedListing.property.area.toLocaleString()} Sq Ft
              </div>
              <div className={styles.mapPopupPrice}>
                ${selectedListing.listPrice.toLocaleString()}
              </div>
              <div className={styles.mapPopupAddress}>
                {selectedListing.address.full}
              </div>
            </div>
          </div>
        </OverlayView>
      )}
    </GoogleMap>
  );
}   