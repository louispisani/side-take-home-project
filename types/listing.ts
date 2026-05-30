export interface Listing {
  mlsId: number;
  photos: string[];
  listPrice: number;
  listDate: string;

  address: {
    full?: string;
    streetName?: string;
    city?: string;
    state?: string;
  };

  property: {
    bedrooms: number;
    bathsFull: number;
    bathsHalf: number;
    area: number;
  };

  geo: {
    lat: number;
    lng: number;
  };
}