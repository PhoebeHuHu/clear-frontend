export enum ECargoType {
  FCX = "FCX",
  LCL = "LCL",
  FCL = "FCL",
}

import { ICargoItem } from "@/types/cargo";
import { HTMLInputTypeAttribute } from "react";

type CargoField = {
  key: keyof ICargoItem;
  label: string;
};

export const CARGO_FIELDS: CargoField[] = [
  { key: "cargo_type", label: "Cargo Type" },
  { key: "number_of_packages", label: "Number of Packages" },
  { key: "container_number", label: "Container Number" },
  { key: "master_bill_of_lading_number", label: "Master Bill Number" },
  { key: "house_bill_of_lading_number", label: "House Bill Number" },
] as const;

export interface IFormFieldConfig {
  key: keyof ICargoItem;
  label: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
}

export const CARGO_FORM_FIELDS: IFormFieldConfig[] = [
  {
    key: "number_of_packages",
    label: "Number of Packages",
    type: "number",
    required: true,
    min: 1,
  },
  {
    key: "container_number",
    label: "Container Number (optional)",
    type: "text",
    required: false,
    placeholder: "Enter Container Number",
  },
  {
    key: "master_bill_of_lading_number",
    label: "Master Bill of Lading Number (optional)",
    type: "text",
    required: false,
    placeholder: "Enter Master Bill Number",
  },
  {
    key: "house_bill_of_lading_number",
    label: "House Bill of Lading Number (optional)",
    type: "text",
    required: false,
    placeholder: "Enter House Bill Number",
  },
];

export const CARGO_TYPES = [
  { value: ECargoType.FCL, label: "FCL" },
  { value: ECargoType.LCL, label: "LCL" },
  { value: ECargoType.FCX, label: "FCX" },
] as const;
