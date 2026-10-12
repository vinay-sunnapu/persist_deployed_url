import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.localStorage.clear();
});

test("shows the workspace and navigates between pages", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: /Good things grow/i })
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole("link", { name: /My notes/i }));
  expect(
    screen.getByRole("heading", { name: /A place for your thoughts/i })
  ).toBeInTheDocument();
});

test("creates a note and keeps it in local storage", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("link", { name: /My notes/i }));
  fireEvent.click(screen.getByRole("button", { name: /New note/i }));
  fireEvent.change(screen.getByLabelText("Note title"), {
    target: { value: "Offline test" }
  });
  fireEvent.change(screen.getByLabelText("Your note"), {
    target: { value: "Saved without a network." }
  });
  fireEvent.click(screen.getByRole("button", { name: /Save note/i }));

  expect(screen.getByRole("heading", { name: "Offline test" })).toBeInTheDocument();
  expect(window.localStorage.getItem("fieldnotes:notes")).toContain(
    "Saved without a network."
  );
});

test("keeps playground interactions in local storage", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("link", { name: /Offline lab/i }));
  fireEvent.click(screen.getByRole("button", { name: /Add a click/i }));

  expect(screen.getByText("1")).toBeInTheDocument();
  expect(window.localStorage.getItem("fieldnotes:offline-lab")).toContain(
    '"count":1'
  );
});
