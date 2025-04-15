import React, { useState } from "react";
import GeneralSession from "@/components/GeneralSession";
import Button from "@/components/Button";
import BaseInput from "@/components/BaseInput";
import styled from "styled-components";
import { ICargoItem } from "@/types/cargo";
import {
  ECargoType,
  CARGO_FORM_FIELDS,
  CARGO_TYPES,
  IFormFieldConfig,
} from "@/constants/cargo";

interface ICargoFormProps {
  onSubmit: (cargoItem: ICargoItem) => void;
  onCancel: () => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #444;
  background: transparent;
  color: white;
  option {
    background-color: #444;
  }
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const CargoForm = ({ onSubmit, onCancel }: ICargoFormProps) => {
  const [formValues, setFormValues] = useState<ICargoItem>({
    cargo_type: ECargoType.FCL,
    number_of_packages: 0,
    container_number: "",
    master_bill_of_lading_number: "",
    house_bill_of_lading_number: "",
  });

  const handleChange = (field: keyof ICargoItem, value: string | number) => {
    const parsedValue = field === "number_of_packages" ? Number(value) : value;
    setFormValues((prev) => ({ ...prev, [field]: parsedValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <GeneralSession title="Cargo">
      <h3>Add Cargo Item</h3>
      <Form onSubmit={handleSubmit}>
        <Select
          required
          value={formValues.cargo_type}
          onChange={(e) =>
            handleChange("cargo_type", e.target.value as ECargoType)
          }
        >
          <option value="">Select Cargo Type</option>
          {CARGO_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
        {CARGO_FORM_FIELDS.map((field: IFormFieldConfig) => (
          <BaseInput
            key={field.key}
            label={field.label}
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            min={field.min}
            value={formValues[field.key]}
            onChange={(e) => handleChange(field.key, e.target.value)}
          />
        ))}
        <ActionButtons>
          <Button variant="filled" type="submit">
            Add
          </Button>
          <Button variant="outlined" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </ActionButtons>
      </Form>
    </GeneralSession>
  );
};

export default CargoForm;
