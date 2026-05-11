/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Side React Take-home Assignment/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
