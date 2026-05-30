# Getting Started

- Please read [INSTRUCTIONS.md](https://github.com/reside-eng/take-home-assignment-nextjs-simplyrets/blob/main/INSTRUCTIONS.md)
- For any questions about Next.js, please visit https://nextjs.org/docs

# Code and Design Decisions

## Design Decisions

- Used a Next.js API route to proxy SimplyRETS requests so API credentials are not exposed client-side.
- Listing data is loaded client-side to support responsive map interactions and `localStorage` caching.
- Added `localStorage` caching for both listings and favorites to reduce unnecessary API requests and persist user state.
- Implemented responsive list/map layouts based on the provided Figma designs.
- Used Google Maps bounds filtering so the property list updates based on the current map viewport.
- Added an interactive map preview popup when selecting property markers to create a more Zillow-like browsing experience.
- Added a few simple tests to validate rendering and favorite interactions.

## Tradeoffs / Future Improvements

- In production, I would likely add server-side rendering or React Query/SWR for more advanced caching and loading states.
- I considered using a UI library like MUI or Kendo, but chose to keep the implementation lightweight for the scope of the assignment.
- I intentionally kept state management simple using React hooks since the project scope did not require global state.
- Integrated `Next/Image` for property and map preview images. With more time, I would further optimize responsive image sizing, loading behavior, and production image delivery configuration.
- Semantic HTML and baseline accessibility considerations were included throughout the implementation, I would add accessibility enhancements and loading skeleton states could be added with more time.
- I would add favorite functionality to map listings with more time as well

## AI Usage

I used AI tools for test scaffolding, some refactoring, cleanup, and a small amount of utility logic assistance (for example, formatting helpers). The overall application architecture, component logic, responsive behavior, map interactions, and styling implementation were designed and implemented manually, while AI was used similarly to how I would use modern developer tooling in day-to-day development workflows.

## Local Setup

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

Then install dependencies and start the development server:

```bash
npm install
npm run dev
```
