import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Input = styled.input`
  color: black;
  margin: 1rem 0;
  padding: 5px;
`;
