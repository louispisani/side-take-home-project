/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";

import Home from "../pages/index";
import Listings from "../pages/listings";

const toggleFavorite = jest.fn();

jest.mock("../hooks/useListings", () => ({
  useListings: () => ({
    loading: false,
    error: false,
    listings: [
      {
        mlsId: 1,
        listPrice: 199000,
        listDate: "2024-01-01",
        photos: ["https://picsum.photos/300/200"],
        address: {
          full: "420 Catalina Way",
        },
        property: {
          bedrooms: 2,
          bathsFull: 2,
          bathsHalf: 1,
          area: 1500,
        },
        geo: {
          lat: 37.77,
          lng: -122.4,
        },
      },
    ],
  }),
}));

jest.mock("../hooks/useFavorites", () => ({
  useFavorites: () => ({
    favorites: [],
    toggleFavorite,
  }),
}));

jest.mock("../components/PropertyMap", () => {
  return function MockMap() {
    return <div>Mock Map</div>;
  };
});

describe("Home", () => {
  it("renders homepage heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /Side React Take-home Assignment/i,
      })
    ).toBeInTheDocument();
  });
});

describe("Listings", () => {
  it("renders listing data", () => {
    render(<Listings />);

    expect(screen.getByText(/420 Catalina Way/i)).toBeInTheDocument();
    expect(screen.getByText(/\$199,000/i)).toBeInTheDocument();
    expect(screen.getByText(/2 BR/i)).toBeInTheDocument();
  });

  it("renders map", () => {
    render(<Listings />);

    expect(screen.getByText(/Mock Map/i)).toBeInTheDocument();
  });

  it("toggles favorite", () => {
    render(<Listings />);

    const button = screen.getByRole("button", {
      name: /add to favorites/i,
    });

    fireEvent.click(button);

    expect(toggleFavorite).toHaveBeenCalledWith(1);
  });
});