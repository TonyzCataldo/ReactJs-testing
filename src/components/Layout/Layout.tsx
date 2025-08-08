import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import * as S from "./Layout.style";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";

import { lightTheme } from "../../styles/themes/light";
import { darkTheme } from "../../styles/themes/dark";
import { GlobalStyle } from "../../styles/GlobalStyle";

export default function Layout() {
  const [isDark, setIsDark] = useState(false);
  const currentTheme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(darkMode);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <S.Container>
        <Header />
        <S.Main>
          <Outlet />
        </S.Main>
      </S.Container>
    </ThemeProvider>
  );
}
