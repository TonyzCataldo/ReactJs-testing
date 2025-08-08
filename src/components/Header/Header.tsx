// components/Header.tsx

import * as S from "./Header.style";
export default function Header() {
  return (
    <S.Header>
      <h2>logo</h2>
      <S.Nav>
        <S.StyledLink to="/">Home</S.StyledLink>
        <S.StyledLink to="/pagina">Pagina</S.StyledLink>
      </S.Nav>
    </S.Header>
  );
}
