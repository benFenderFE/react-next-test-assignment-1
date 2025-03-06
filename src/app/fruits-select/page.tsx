"use client";

import Link from "next/link";
import styled from "styled-components";
import FruitsSelectListTest from "@/components/FruitsSelectListTest";

const Container = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff7e6;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #d35400;
`;

const BackLink = styled(Link)`
  margin-top: 16px;
  color: #e67e22;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s ease;

  &:hover {
    color: #d35400;
  }
`;

export default function FruitsSelectPage() {
  return (
    <Container>
      <Title>🍎 Fruits Select List</Title>
      <FruitsSelectListTest />
      <BackLink href="/">⬅️ Back to Home</BackLink>
    </Container>
  );
}
