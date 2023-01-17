import "@testing-library/jest-dom";
import { renderWithContexts } from "../test-utils/render";

describe("Home", () => {
  it("renders a heading", () => {
    renderWithContexts(<div></div>);
  });
});
