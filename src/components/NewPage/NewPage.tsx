import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import * as S from "./NewPage.style";

const schema = yup.object({
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "O nome não pode conter números"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  cep: yup
    .string()
    .required("O CEP é obrigatório")
    .matches(/^\d{8}$/, "O CEP deve conter exatamente 8 números"),
});

type FormData = yup.Asserts<typeof schema>;

const NewPage = () => {
  const [finalValues, setFinalValues] = useState({
    Nome: "",
    Email: "",
    Cep: "",
    Logradouro: "",
    Bairro: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema) as Resolver<FormData>,
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${data.cep}/json/`);

      if (res.data.erro) {
        setError("cep", {
          type: "manual",
          message: "CEP não encontrado",
        });
        const value = {
          Nome: data.nome,
          Email: data.email,
          Cep: data.cep,
          Logradouro: "",
          Bairro: "",
        };
        setFinalValues(value);
        console.log(value);
      } else {
        const value = {
          Nome: data.nome,
          Email: data.email,
          Cep: data.cep,
          Logradouro: res.data.logradouro || "",
          Bairro: res.data.bairro || "",
        };
        setFinalValues(value);
        console.log(value);
      }
    } catch (err) {
      setError("cep", {
        type: "manual",
        message: "Erro ao buscar o CEP",
      });
      const value = {
        Nome: "",
        Email: "",
        Cep: "",
        Logradouro: "",
        Bairro: "",
      };
      setFinalValues(value);
      console.log(value);
    }
  };
  return (
    <S.Div>
      <h1>Formulário com validação para fazer testes em cima da API</h1>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Input placeholder="Nome" {...register("nome")} />
        {errors.nome && <p>{errors.nome.message}</p>}

        <S.Input placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}

        <S.Input
          placeholder="CEP"
          {...register("cep")}
          inputMode="numeric"
          autoComplete="new-cep"
        />
        {errors.cep && <p>{errors.cep.message}</p>}
        <button type="submit">Enviar</button>
      </S.Form>
      {finalValues.Nome && (
        <div>
          <h2>Dados salvos:</h2>
          <p>Nome: {finalValues.Nome}</p>
          <p>Email: {finalValues.Email}</p>
          <p>CEP: {finalValues.Cep}</p>
          <p>Logradouro: {finalValues.Logradouro}</p>
          <p>Bairro: {finalValues.Bairro}</p>
        </div>
      )}
    </S.Div>
  );
};

export default NewPage;
