import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CollapsibleMenu from "./CollapsibleMenu";
import { CollapsibleMenuItems, MenuItem } from "../config";

test("Show/hide menu on click", async () => {
  render(
    <BrowserRouter>
      <CollapsibleMenu />
    </BrowserRouter>
  );

  const hamburger = screen.getByRole("button");

  CollapsibleMenuItems.map((item: MenuItem) =>
    expect(screen.queryByText(`${item.name}`)).not.toBeInTheDocument()
  );

  act(() => {
    userEvent.click(hamburger);
  });

  CollapsibleMenuItems.map((item: MenuItem) => async () => {
    await waitFor(() => {
      expect(screen.getByText(`${item.name}`)).toBeInTheDocument();
    });
  });

  act(() => {
    userEvent.click(hamburger);
  });

  CollapsibleMenuItems.map((item: MenuItem) =>
    expect(screen.queryByText(`${item.name}`)).not.toBeInTheDocument()
  );
});
