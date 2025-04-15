import React from "react";
import styled from "styled-components";
import { ICargoItem } from "@/types/cargo";
import { CARGO_FIELDS } from "@/constants/cargo";

interface ICargoCardProps {
  item: ICargoItem;
  index: number;
  removeable?: boolean;
  onRemove?: (index: number) => void;
}

const Container = styled.div`
  background: #333;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Label = styled.span`
  color: #888;
  min-width: 120px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  outline: none;
  color: #888;
  cursor: pointer;
  padding: 2px 4px;
  transition: all 0.2s ease-out;

  &:hover {
    color: #666;
    border-bottom: 1px solid #666;
  }
`;

const CargoCard: React.FC<ICargoCardProps> = ({
  item,
  index,
  removeable = false,
  onRemove,
}) => {
  return (
    <Container>
      <Header>
        <h3>Cargo Item {index + 1}</h3>
        {removeable && onRemove && (
          <RemoveButton onClick={() => onRemove(index)}>Remove</RemoveButton>
        )}
      </Header>
      <Content>
        {CARGO_FIELDS.map(({ key, label }) => {
          const value = item[key];
          if (!value && key !== "cargo_type" && key !== "number_of_packages") {
            return null;
          }
          return (
            <Row key={key}>
              <Label>{label}:</Label>
              <span>{value}</span>
            </Row>
          );
        })}
      </Content>
    </Container>
  );
};

export default CargoCard;
