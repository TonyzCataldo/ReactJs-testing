import { render, screen } from "@testing-library/react";
import NewPage from "./NewPage";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../../styles/themes/dark";
import userEvent from "@testing-library/user-event";
import axios from "axios";
jest.mock("axios");

describe("NewPage", () => {
  const user = userEvent.setup();

  describe("render initial component elements", () => {
    beforeEach(() => {
      render(
        <ThemeProvider theme={darkTheme}>
          <NewPage />
        </ThemeProvider>
      );
    });
    it("render component title", () => {
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: "Formulário com validação para fazer testes em cima da API",
        })
      ).toBeInTheDocument();
    });

    it("render component inputs", () => {
      expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("CEP")).toBeInTheDocument();
    });
    it("render component button", () => {
      expect(
        screen.getByRole("button", {
          name: "Enviar",
        })
      ).toBeInTheDocument();
    });
  });
  describe("form validation and block submit when empty or invalid data", () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    let nameInput: HTMLInputElement;
    let emailInput: HTMLInputElement;
    let cepInput: HTMLInputElement;
    let button: HTMLButtonElement;
    beforeEach(() => {
      mockedAxios.get.mockClear();
      render(
        <ThemeProvider theme={darkTheme}>
          <NewPage />
        </ThemeProvider>
      );
      nameInput = screen.getByPlaceholderText("Nome");
      emailInput = screen.getByPlaceholderText("Email");
      cepInput = screen.getByPlaceholderText("CEP");
      button = screen.getByRole("button", { name: "Enviar" });
    });
    describe("when user try to submit with empty form", () => {
      it("should render empty error messages when user click in the button", async () => {
        await user.click(button);
        expect(screen.getByText("O nome é obrigatório")).toBeInTheDocument();
        expect(screen.getByText("Email obrigatório")).toBeInTheDocument();
        expect(screen.getByText("O CEP é obrigatório")).toBeInTheDocument();
      });

      it("shouldn't call submit function when user click in the button", async () => {
        await user.click(button);
        expect(mockedAxios.get).not.toHaveBeenCalled();
      });
    });
    describe("when user try to submit with invalid data", () => {
      it("should render invalid error messages when user click in the button", async () => {
        await user.type(nameInput, "1111");
        await user.type(emailInput, "thisisnotaemail");
        await user.type(cepInput, "notacep12225");
        await user.click(button);
        expect(
          screen.getByText("O nome não pode conter números")
        ).toBeInTheDocument();
        expect(screen.getByText("Email inválido")).toBeInTheDocument();
        expect(
          screen.getByText("O CEP deve conter exatamente 8 números")
        ).toBeInTheDocument();
      });
      it("shouldn't call submit function when user click in the button", async () => {
        await user.type(nameInput, "1111");
        await user.type(emailInput, "thisisnotaemail");
        await user.type(cepInput, "notacep12225");
        await user.click(button);
        expect(mockedAxios.get).not.toHaveBeenCalled();
      });
    });
  });
  describe("when form is correctly filled, submit the function", () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    let consoleSpy: jest.SpyInstance;
    let nameInput: HTMLInputElement;
    let emailInput: HTMLInputElement;
    let cepInput: HTMLInputElement;
    let button: HTMLButtonElement;

    beforeEach(() => {
      mockedAxios.get.mockClear();
      render(
        <ThemeProvider theme={darkTheme}>
          <NewPage />
        </ThemeProvider>
      );
      consoleSpy = jest.spyOn(console, "log").mockImplementation();
      nameInput = screen.getByPlaceholderText("Nome");
      emailInput = screen.getByPlaceholderText("Email");
      cepInput = screen.getByPlaceholderText("CEP");
      button = screen.getByRole("button", { name: "Enviar" });
    });
    afterEach(() => {
      consoleSpy.mockRestore();
    });

    describe("when fc axios.get find the cep", () => {
      it("should call axios.get, find the address and render the complete values", async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            logradouro: "Rua Abc",
            bairro: "Bairro Defgh",
          },
        });

        await user.type(nameInput, "antonio");
        await user.type(emailInput, "antonio@antonio.com");
        await user.type(cepInput, "00112233");
        await user.click(button);
        expect(await screen.findByText("Nome: antonio")).toBeInTheDocument();
        expect(
          screen.getByText("Email: antonio@antonio.com")
        ).toBeInTheDocument();
        expect(await screen.findByText("CEP: 00112233")).toBeInTheDocument();
        expect(
          await screen.findByText("Logradouro: Rua Abc")
        ).toBeInTheDocument();
        expect(
          await screen.findByText("Bairro: Bairro Defgh")
        ).toBeInTheDocument();

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      });
      it("should call axios.get, find the address and console.log the values", async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            logradouro: "Rua Abc",
            bairro: "Bairro Defgh",
          },
        });

        await user.type(nameInput, "antonio");
        await user.type(emailInput, "antonio@antonio.com");
        await user.type(cepInput, "00112233");
        await user.click(button);
        expect(mockedAxios.get).toHaveBeenCalledWith(
          "https://viacep.com.br/ws/00112233/json/"
        );
        expect(consoleSpy).toHaveBeenCalledWith({
          Nome: "antonio",
          Email: "antonio@antonio.com",
          Cep: "00112233",
          Logradouro: "Rua Abc",
          Bairro: "Bairro Defgh",
        });
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      });
    });

    describe("when fc axios.get dont find the cep", () => {
      it("should call axios.get, dont find the address and render partial values", async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            erro: "cep nao encontrado",
          },
        });

        await user.type(nameInput, "antonio");
        await user.type(emailInput, "antonio@antonio.com");
        await user.type(cepInput, "00000000");
        await user.click(button);

        expect(await screen.findByText("Nome: antonio")).toBeInTheDocument();
        expect(
          screen.getByText("Email: antonio@antonio.com")
        ).toBeInTheDocument();
        expect(await screen.findByText("CEP: 00000000")).toBeInTheDocument();
        expect(await screen.findByText("Logradouro:")).toBeInTheDocument();
        expect(await screen.findByText("Bairro:")).toBeInTheDocument();

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      });

      it("should call axios.get, dont find the address and console.log the values", async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            erro: "cep nao encontrado",
          },
        });

        await user.type(nameInput, "antonio");
        await user.type(emailInput, "antonio@antonio.com");
        await user.type(cepInput, "00000000");
        await user.click(button);
        expect(mockedAxios.get).toHaveBeenCalledWith(
          "https://viacep.com.br/ws/00000000/json/"
        );
        expect(consoleSpy).toHaveBeenCalledWith({
          Nome: "antonio",
          Email: "antonio@antonio.com",
          Cep: "00000000",
          Logradouro: "",
          Bairro: "",
        });
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledTimes(1);
      });

      it("should call axios.get, dont find address and show cep error message", async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            erro: "cep nao encontrado",
          },
        });
        await user.type(nameInput, "antonio");
        await user.type(emailInput, "antonio@antonio.com");
        await user.type(cepInput, "00000000");
        await user.click(button);
        expect(
          await screen.findByText("CEP não encontrado")
        ).toBeInTheDocument();
      });
    });

    describe("when fc axios.get fail", () => {
      it("should try axios.get, fail, goes to catch block and dont render values", async () => {
        mockedAxios.get.mockRejectedValueOnce({
          error: "erro",
        });
        await user.type(nameInput, "antonio");
        await user.type(emailInput, "antonio@antonio.com");
        await user.type(cepInput, "03565000");
        await user.click(button);
        expect(screen.queryByText("Dados salvos:")).not.toBeInTheDocument();
      });
      it("should try axios.get, fail, goes to catch block and console.log empty values", async () => {
        mockedAxios.get.mockRejectedValueOnce({
          error: "erro",
        });
        await user.type(nameInput, "antonio");
        await user.type(emailInput, "antonio@antonio.com");
        await user.type(cepInput, "03565000");
        await user.click(button);
        expect(mockedAxios.get).toHaveBeenCalledWith(
          "https://viacep.com.br/ws/03565000/json/"
        );

        expect(consoleSpy).toHaveBeenCalledWith({
          Nome: "",
          Email: "",
          Cep: "",
          Logradouro: "",
          Bairro: "",
        });
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      });
      it("should try axios.get, fail, goes to catch block and show cep error message", async () => {
        mockedAxios.get.mockRejectedValueOnce({
          error: "erro",
        });
        await user.type(nameInput, "antonio");
        await user.type(emailInput, "antonio@antonio.com");
        await user.type(cepInput, "03565000");
        await user.click(button);
        expect(screen.getByText("Erro ao buscar o CEP")).toBeInTheDocument();
      });
    });
  });
});
