import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    render(<Counter defaultCount={0} description="description props" />);
  });

  describe('initialized with default counter = 0, a input with the value of counter and description "description props"', () => {
    it("should render a title with Counter = 0", () => {
      expect(
        screen.getByRole("heading", { level: 1, name: "Counter = 0" })
      ).toBeInTheDocument();
    });

    it("should render description as descriptionprops", () => {
      expect(screen.getByText("description props")).toBeInTheDocument();
    });
    it("should render input with 1", () => {
      const input = screen.getByRole("spinbutton", {
        name: "Valor para alterar",
      });
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue(1);
    });
    it("should render + and - buttons", () => {
      expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    });
  });
  describe("when + is clicked add 1 to counter", () => {
    it("should render title with Counter = 1 after + button is clicked", async () => {
      const addButton = screen.getByRole("button", { name: "+" });
      await user.click(addButton);
      expect(
        screen.getByRole("heading", { level: 1, name: "Counter = 1" })
      ).toBeInTheDocument();
    });
  });
  describe("when - is clicked retire 1 to counter", () => {
    it("should render title with Counter = -1 after - button is clicked", async () => {
      const minusButton = screen.getByRole("button", { name: "-" });
      await user.click(minusButton);

      expect(
        await screen.findByRole("heading", { level: 1, name: "Counter = -1" })
      ).toBeInTheDocument();
    });
  });
  describe("when user change the input value, render and change the value of operations", () => {
    it("should render input with new value", async () => {
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
  describe("when user change 2 times the input value and + is clicked two times retire the input number to counter", () => {
    it("should render title with counter 7 after change input to 5 click + and change to 2 and click + again", async () => {
      const input = screen.getByRole("spinbutton", {
        name: "Valor para alterar",
      });
      const addButton = screen.getByRole("button", { name: "+" });
      await user.clear(input);
      await user.type(input, "5");
      await user.click(addButton);
      await user.clear(input);
      await user.type(input, "2");
      await user.click(addButton);
      expect(
        await screen.findByRole("heading", { level: 1, name: "Counter = 7" })
      ).toBeInTheDocument();
    });
  });
  describe("when user change the input value and - is clicked retire the input number to counter", () => {
    it("should render title with counter -5 after - button is clicked", async () => {
      const input = screen.getByRole("spinbutton", {
        name: "Valor para alterar",
      });
      const minusButton = screen.getByRole("button", { name: "-" });
      await user.clear(input);
      await user.type(input, "5");
      await user.click(minusButton);
      expect(
        await screen.findByRole("heading", { level: 1, name: "Counter = -5" })
      ).toBeInTheDocument();
    });
  });
  describe("when user change 2 times the input value and - is clicked two times retire the input number to counter", () => {
    it("should render title with counter -7 after change input to 5 click - and change to 2 and click - again", async () => {
      const input = screen.getByRole("spinbutton", {
        name: "Valor para alterar",
      });
      const minusButton = screen.getByRole("button", { name: "-" });
      await user.clear(input);
      await user.type(input, "5");
      await user.click(minusButton);
      await user.clear(input);
      await user.type(input, "2");
      await user.click(minusButton);
      expect(
        await screen.findByRole("heading", { level: 1, name: "Counter = -7" })
      ).toBeInTheDocument();
    });
  });
  describe("when the value of Counter is >= 15 isBigger need to change and show a message", () => {
    it("should render the message with counter => 15", async () => {
      const input = screen.getByRole("spinbutton", {
        name: "Valor para alterar",
      });
      const addButton = screen.getByRole("button", { name: "+" });
      await user.clear(input);
      await user.type(input, "15");
      await user.click(addButton);
      expect(await screen.findByText("valor é grande")).toBeInTheDocument();
    });
    it("should render the atualizando when add or retire and be removed", async () => {
      const addButton = screen.getByRole("button", { name: "+" });
      await user.click(addButton);
      expect(screen.getByText("atualizando...")).toBeInTheDocument();
      await waitForElementToBeRemoved(() =>
        screen.queryByText("atualizando...")
      );
      expect(screen.queryByText("atualizando...")).not.toBeInTheDocument();
    });
  });
});
