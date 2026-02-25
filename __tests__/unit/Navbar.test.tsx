import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/Navbar";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue(null),
  }),
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    nav: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <nav {...props}>{children}</nav>
    ),
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
    form: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <form {...props}>{children}</form>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Navbar", () => {
  it("renders correctly and handles search toggle", () => {
    render(<Navbar />);

    // Check Branding
    expect(screen.getByText("WHISPER")).toBeInTheDocument();

    // Search input should not be visible initially
    expect(screen.queryByPlaceholderText(/Search.../i)).not.toBeInTheDocument();

    // Click search button to reveal input
    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    // Search input should now be visible
    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
  });

  it("contains navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(screen.getByText("TV Shows")).toBeInTheDocument();
    expect(screen.getByText("Trending")).toBeInTheDocument();
  });
});
