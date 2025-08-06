import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter", () => {
  const user = userEvent.setup();
  describe('initialized with default counter = 0, a input with the value of counter and description "description props"', () => {
    it("should render a title with Counter = 0", () => {
      render(<Counter defaultCount={0} description="description props" />);
      expect(
        screen.getByRole("heading", { level: 1, name: "Counter = 0" })
      ).toBeInTheDocument();
    });
    it("should render description as descriptionprops", () => {
      render(<Counter defaultCount={0} description="description props" />);
      expect(screen.getByText("description props")).toBeInTheDocument();
    });
    it("should render input with 1", () => {
      render(<Counter defaultCount={0} description="description props" />);
      const input = screen.getByRole("spinbutton", {
        name: "Valor para alterar",
      });
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue(1);
    });
    it("should render + and - buttons", () => {
      render(<Counter defaultCount={0} description="description props" />);
      expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    });
  });
  describe("when + is clicked add 1 to counter", () => {
    it("should render title with Counter = 1 after + button is clicked", async () => {
      render(<Counter defaultCount={0} description="description props" />);
      const addButton = screen.getByRole("button", { name: "+" });
      await user.click(addButton);
      expect(
        screen.getByRole("heading", { level: 1, name: "Counter = 1" })
      ).toBeInTheDocument();
    });
  });
  describe("when - is clicked retire 1 to counter", () => {
    it("should render title with Counter = -1 after - button is clicked", async () => {
      render(<Counter defaultCount={0} description="description props" />);
      const minusButton = screen.getByRole("button", { name: "-" });
      await user.click(minusButton);
      expect(
        screen.getByRole("heading", { level: 1, name: "Counter = -1" })
      ).toBeInTheDocument();
    });
  });
  describe("when user change the input value, render and change the value of operations", () => {
    it("should render input with new value", async () => {
      render(<Counter defaultCount={0} description="description props" />);
      const input = screen.getByRole("spinbutton", {
        name: "Valor para alterar",
      });
      await user.clear(input);
      await user.type(input, "3");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue(3);
    });
  });
  describe("when user change the input value and + is clicked add the input number to counter", () => {
    it("should render title with counter 5 after + button is clicked", async () => {
      render(<Counter defaultCount={0} description="description props" />);
      const input = screen.getByRole("spinbutton", {
        name: "Valor para alterar",
      });
      const addButton = screen.getByRole("button", { name: "+" });
      await user.clear(input);
      await user.type(input, "5");
      await user.click(addButton);
      expect(
        screen.getByRole("heading", { level: 1, name: "Counter = 5" })
      ).toBeInTheDocument();
    });
  });
  describe("when user change the input value and - is clicked retire the input number to counter", () => {
    it("should render title with counter -5 after - button is clicked", async () => {
      render(<Counter defaultCount={0} description="description props" />);
      const input = screen.getByRole("spinbutton", {
        name: "Valor para alterar",
      });
      const minusButton = screen.getByRole("button", { name: "-" });
      await user.clear(input);
      await user.type(input, "5");
      await user.click(minusButton);
      expect(
        screen.getByRole("heading", { level: 1, name: "Counter = -5" })
      ).toBeInTheDocument();
    });
  });
});
