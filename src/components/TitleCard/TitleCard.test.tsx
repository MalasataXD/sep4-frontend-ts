import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TitleCard from "./TitleCard";

test("renders correctly", () => {
  const props = {
    link: "/example-link",
    image: "example-image.jpg",
    color: "red",
    title: "Example Title",
    description: "Example Description",
  };

  const { getByText, getByAltText } = render(
    <Router>
      <TitleCard {...props} />
    </Router>
  );

  expect(screen.getByText(props.title)).toBeInTheDocument();
  expect(screen.getByText(props.description)).toBeInTheDocument();
  expect(screen.getByRole("img").getAttribute("src")).toBe(props.image);
});
