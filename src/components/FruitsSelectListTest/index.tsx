"use client";

import { useState } from "react";
import styled from "styled-components";

interface Item {
  type: "Fruit" | "Vegetable";
  name: string;
}

const initialItems: Item[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  width: 500px;
`;

const Section = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 33%;
  background: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: darkred;
`;

const ItemBox = styled.div`
  padding: 8px;
  color: black;
  margin-top: 8px;
  border-radius: 4px;
  background: #e2e8f0;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #cbd5e1;
  }
`;

const CategorizedItemBox = styled(ItemBox)`
  background: #bbf7d0;
  cursor: default;
  &:hover {
    background: #bbf7d0;
  }
`;

const FruitsSelectListTest = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [categorizedItems, setCategorizedItems] = useState<Record<string, Item[]>>({});

  const handleMove = (item: Item) => {
    setItems((prev) => prev.filter((i) => i.name !== item.name));
    setCategorizedItems((prev) => {
      const newCategory = {
        ...prev,
        [item.type]: [...(prev[item.type] || []), item],
      };

      setTimeout(() => {
        setCategorizedItems((prev) => {
          const filteredList = prev[item.type]?.filter((i) => i.name !== item.name) || [];
          return { ...prev, [item.type]: filteredList };
        });

        setItems((prev) => (prev.some((i) => i.name === item.name) ? prev : [...prev, item]));

        setCategorizedItems({});
      }, 5000);

      return newCategory;
    });
  };

  return (
    <Container>
      {/* Main List */}
      <Section>
        <Title>Main List</Title>
        {items.map((item) => (
          <ItemBox key={item.name} onClick={() => handleMove(item)}>
            {item.name}
          </ItemBox>
        ))}
      </Section>

      {/* Categorized Items */}
      {Object.entries(categorizedItems).map(([type, list]) => (
        <Section key={type}>
          <Title>{type}</Title>
          {list.map((item) => (
            <CategorizedItemBox key={item.name}>{item.name}</CategorizedItemBox>
          ))}
        </Section>
      ))}
    </Container>
  );
};

export default FruitsSelectListTest;
