import { render } from "@testing-library/react";
import Skeleton from "@/components/Skeleton";

describe("Skeleton", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("rounded-md");
    expect(skeleton).toHaveClass("bg-zinc-800/50");
  });

  it("applies custom className", () => {
    const { container } = render(<Skeleton className="custom-class h-10 w-10" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveClass("custom-class");
    expect(skeleton).toHaveClass("h-10");
    expect(skeleton).toHaveClass("w-10");
  });
});
