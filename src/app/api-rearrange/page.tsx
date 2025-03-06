"use client";

import Link from "next/link";
import styled from "styled-components";
import APIRearrange from "@/components/APIRearrange";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #e6f7ff;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #0070f3;
`;

const BackLink = styled(Link)`
  margin-top: 16px;
  color: #0070f3;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s ease;

  &:hover {
    color: #005ecb;
  }
`;

export default function ApiRearrangePage() {
  return (
    <Container>
      <Title>🔄 API Call Rearrange</Title>
      <APIRearrange />
      <BackLink href="/">⬅️ Back to Home</BackLink>
    </Container>
  );
}
