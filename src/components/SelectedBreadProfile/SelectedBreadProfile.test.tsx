import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectedBreadProfile from "./SelectedBreadProfile";

describe("SelectedBreadProfile", () => {
  test("renders without error", () => {
    render(<SelectedBreadProfile />);
  });

  test("displays 'Add' button when no bread profile is selected", () => {
    const { getByText } = render(<SelectedBreadProfile />);
    expect(getByText("Add")).toBeInTheDocument();
  });

  test("displays 'Add', 'Remove', and 'Edit' buttons when a bread profile is selected", () => {
    const selectedData = {
      title: "Test Profile",
      description: "Test description",
    };
    const { getByText } = render(
      <SelectedBreadProfile SelectedData={selectedData} />
    );
    expect(getByText("Add")).toBeInTheDocument();
    expect(getByText("Remove")).toBeInTheDocument();
    expect(getByText("Edit")).toBeInTheDocument();
  });

  test("Add button triggers correct actions", () => {
    const setshowAdd = jest.fn();
    const setshowRemove = jest.fn();
    const setshowEdit = jest.fn();
    const setshowSave = jest.fn();
    const setInputValue = jest.fn();
    const setDescription = jest.fn();
    const setTitle = jest.fn();
    const setSelectedData = jest.fn(); // Modify the function name here
    const props = {
      setshowAdd: setshowAdd,
      setshowRemove: setshowRemove,
      setshowEdit: setshowEdit,
      setshowSave: setshowSave,
      setInputValue: setInputValue,
      setDescription: setDescription,
      setTitle: setTitle,
      setSelectedData: setSelectedData,
    };

    render(<SelectedBreadProfile {...props} />);

    fireEvent.click(screen.getByText("Add"));

    expect(setshowAdd).toHaveBeenCalledWith(true);
    expect(setshowRemove).toHaveBeenCalledWith(false);
    expect(setshowEdit).toHaveBeenCalledWith(false);
  });
});
