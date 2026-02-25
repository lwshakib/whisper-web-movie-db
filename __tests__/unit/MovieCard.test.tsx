import { render, screen } from "@testing-library/react";
import MovieCard from "@/components/MovieCard";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, ...props }: { fill?: boolean; alt?: string } & Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} data-fill={fill ? "true" : "false"} />;
  },
}));

const mockMovie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test.jpg",
  vote_average: 8.5,
  release_date: "2024-01-01",
};

describe("MovieCard", () => {
  it("renders movie details correctly", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("links to the correct movie detail page", () => {
    render(<MovieCard movie={mockMovie} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/1");
  });

  it("renders TV show details correctly", () => {
    const mockShow = {
      id: 2,
      name: "Test Show",
      poster_path: "/show.jpg",
      vote_average: 7.2,
      first_air_date: "2023-05-15",
    };
    render(<MovieCard movie={mockShow} type="tv" />);

    expect(screen.getByText("Test Show")).toBeInTheDocument();
    expect(screen.getByText("7.2")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/tv/2");
  });
});
