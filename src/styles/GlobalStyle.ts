import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
   
*{
 box-sizing: border-box;
    margin: 0;
    padding: 0;

    color: ${({ theme }) => theme.colors.text};
    font-family: sans-serif;
   
}

  body {
    background-color: ${({ theme }) => theme.colors.background};
    
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;
