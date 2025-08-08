import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.header`
  width: 100%;

  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0 3rem;
  justify-content: space-between;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;
