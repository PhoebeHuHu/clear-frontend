import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CargoForm from "@/app/components/EDIGenerator/components/CargoForm";
import { ECargoType } from "@/constants/cargo";

describe("CargoForm", () => {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    onCancel.mockClear();
  });

  it("renders form elements", () => {
    render(<CargoForm onSubmit={onSubmit} onCancel={onCancel} />);
    expect(screen.getByText("Add Cargo Item")).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Packages/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Container Number/i)).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls onCancel when Cancel button is clicked", () => {
    render(<CargoForm onSubmit={onSubmit} onCancel={onCancel} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("submits form with values", () => {
    render(<CargoForm onSubmit={onSubmit} onCancel={onCancel} />);

    fireEvent.change(screen.getByLabelText(/Number of Packages/i), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText(/Container Number/i), {
      target: { value: "ABC123" },
    });
    fireEvent.change(screen.getByLabelText(/Master Bill/i), {
      target: { value: "DEF456" },
    });
    fireEvent.change(screen.getByLabelText(/House Bill/i), {
      target: { value: "GHI789" },
    });

    fireEvent.change(screen.getByDisplayValue(ECargoType.FCL), {
      target: { value: ECargoType.LCL },
    });

    fireEvent.click(screen.getByText("Add"));

    expect(onSubmit).toHaveBeenCalledWith({
      cargo_type: ECargoType.LCL,
      number_of_packages: 5,
      container_number: "ABC123",
      master_bill_of_lading_number: "DEF456",
      house_bill_of_lading_number: "GHI789",
    });
  });
});
