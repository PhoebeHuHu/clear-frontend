import React from "react";
import styled from "styled-components";

interface IGeneralSessionProps {
  title: string;
  children: React.ReactNode;
}

const Container = styled.div`
  border: 1px solid #999;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

const ContentBorder = styled.div`
  border: 1px solid #444;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

const GeneralSession = ({ title, children }: IGeneralSessionProps) => {
  return (
    <Container data-testid="general-session">
      <h2>{title}</h2>
      <ContentBorder>{children}</ContentBorder>
    </Container>
  );
};

export default GeneralSession;
