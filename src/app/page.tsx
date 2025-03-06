"use client";

import Link from "next/link";
import styled from "styled-components";

// Styled Components
const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 16px;
  background-color: #f9fafb;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuLink = styled(Link)`
  padding: 12px 24px;
  background-color: #0070f3;
  color: white;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background-color: #005ecb;
  }
`;

export default function Home() {
  return (
    <Container>
      <Title>Select a Page</Title>
      <Nav>
        <MenuLink href="/fruits-select">🍎 Fruits Select List</MenuLink>
        <MenuLink href="/api-rearrange">🔄 API Call Rearrange</MenuLink>
      </Nav>
    </Container>
  );
}
