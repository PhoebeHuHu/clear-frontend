import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EDIGenerator from "@/app/components/EDIGenerator";
import * as api from "@/api/api";

jest.mock("@/api/api");

describe("EDIGenerator", () => {
  const mockSetOutput = jest.fn();
  const mockSetOutputType = jest.fn();
  const mockSetErrors = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with no cargo initially", () => {
    render(
      <EDIGenerator
        setOutput={mockSetOutput}
        setOutputType={mockSetOutputType}
        setErrors={mockSetErrors}
      />
    );
    expect(screen.getByText("Add Cargo Item")).toBeInTheDocument();
    expect(screen.getByText("Generate EDI")).toBeInTheDocument();
  });

  it("opens the modal when Add Cargo Item is clicked", () => {
    render(
      <EDIGenerator
        setOutput={mockSetOutput}
        setOutputType={mockSetOutputType}
        setErrors={mockSetErrors}
      />
    );
    fireEvent.click(screen.getByText("Add Cargo Item"));
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls ediService.generateEDI when Generate EDI is clicked", async () => {
    (api.ediService.generateEDI as jest.Mock).mockResolvedValue({
      edi_content: "LIN+1+I'...",
      errors: [],
    });

    render(
      <EDIGenerator
        setOutput={mockSetOutput}
        setOutputType={mockSetOutputType}
        setErrors={mockSetErrors}
      />
    );

    // Open the form
    fireEvent.click(screen.getByText("Add Cargo Item"));
    fireEvent.change(screen.getByLabelText(/Number of Packages/i), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByLabelText(/Container Number/i), {
      target: { value: "XYZ123" },
    });
    fireEvent.change(screen.getByLabelText(/Master Bill/i), {
      target: { value: "MB001" },
    });
    fireEvent.change(screen.getByLabelText(/House Bill/i), {
      target: { value: "HB001" },
    });

    fireEvent.click(screen.getByText("Add"));

    fireEvent.click(screen.getByText("Generate EDI"));

    await waitFor(() => {
      expect(api.ediService.generateEDI).toHaveBeenCalledTimes(1);
    });

    expect(mockSetOutput).toHaveBeenCalledWith("LIN+1+I'...");
    expect(mockSetOutputType).toHaveBeenCalled();
    expect(mockSetErrors).toHaveBeenCalledWith([]);
  });
});
