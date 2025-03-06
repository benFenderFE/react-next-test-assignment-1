import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface User {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  age: number;
  hair: { color: string };
  address: { postalCode: string };
  company: { department: string };
}

interface GroupedData {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
}

interface GroupedUsers {
  [department: string]: GroupedData;
}

const Container = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const SubTitle = styled.h3`
  font-size: 16px;
  color: #555;
`;

const List = styled.div`
  color: green;
  margin-top: 10px;
`;

const ListItem = styled.div`
  margin: 5px 0;
  padding: 5px;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

const loadingStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontSize: "24px",
  color: "#333",
};

const fetchAndGroupUsers = async (): Promise<GroupedUsers> => {
  const { data } = await axios.get<{ users: User[] }>("https://dummyjson.com/users");

  const grouped: GroupedUsers = {};

  data.users.forEach((user) => {
    const department = user.company.department;

    if (!grouped[department]) {
      grouped[department] = {
        male: 0,
        female: 0,
        ageRange: `${user.age}-${user.age}`,
        hair: {},
        addressUser: {},
      };
    }

    if (user.gender === "male") grouped[department].male += 1;
    else if (user.gender === "female") grouped[department].female += 1;

    // ตรวจสอบและคำนวณช่วงอายุ
    const ages = grouped[department].ageRange.split("-");
    const minAge = Math.min(user.age, ages.length ? parseInt(ages[0]) : user.age);
    const maxAge = Math.max(user.age, ages.length ? parseInt(ages[1]) : user.age);
    grouped[department].ageRange = `${minAge}-${maxAge}`;

    grouped[department].hair[user.hair.color] =
      (grouped[department].hair[user.hair.color] || 0) + 1;

    grouped[department].addressUser[user.firstName + user.lastName] = user.address.postalCode;
  });

  return grouped;
};

const GroupedUsersDisplay: React.FC = () => {
  const [groupedUsers, setGroupedUsers] = useState<GroupedUsers>({});
  const [loading, setLoading] = useState<boolean>(true); // State to track loading

  useEffect(() => {
    fetchAndGroupUsers().then((groupedData) => {
      setLoading(false);
      setGroupedUsers(groupedData);
    });
  }, []);

  if (loading) {
    return (
      <div style={loadingStyle}>
        <span>🔄 Loading...</span>
      </div>
    );
  }

  return (
    <Container>
      {Object.entries(groupedUsers).map(([department, data]) => (
        <Card key={department}>
          <Title>{department}</Title>
          <SubTitle>Male: {data.male}</SubTitle>
          <SubTitle>Female: {data.female}</SubTitle>
          <SubTitle>Age Range: {data.ageRange}</SubTitle>
          <SubTitle>Hair Color:</SubTitle>
          <List>
            {Object.entries(data.hair).map(([color, count]) => (
              <ListItem key={color}>
                {color}: {count}
              </ListItem>
            ))}
          </List>
          <SubTitle>Addresses:</SubTitle>
          <List>
            {Object.entries(data.addressUser).map(([user, postalCode]) => (
              <ListItem key={user}>
                {user}: {postalCode}
              </ListItem>
            ))}
          </List>
        </Card>
      ))}
    </Container>
  );
};

export default GroupedUsersDisplay;
