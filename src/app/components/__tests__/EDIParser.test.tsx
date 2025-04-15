import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EDIParser from "@/app/components/EDIParser";
import * as api from "@/api/api";
import { ErrorMessages } from "@/constants/errorMessages";

jest.mock("@/api/api");

describe("EDIParser", () => {
  const mockSetOutput = jest.fn();
  const mockSetOutputType = jest.fn();
  const mockSetErrors = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders textarea and submit button", () => {
    render(
      <EDIParser
        setOutput={mockSetOutput}
        setOutputType={mockSetOutputType}
        setErrors={mockSetErrors}
      />
    );

    expect(screen.getByPlaceholderText("Enter EDI text")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /parse edi/i })
    ).toBeInTheDocument();
  });

  it("calls decodeEDI and handles success", async () => {
    const mockResponse = {
      cargo_items: [
        {
          cargo_type: "LCL",
          number_of_packages: 9,
          container_number: "ABC123",
        },
      ],
      errors: [],
    };

    (api.ediService.decodeEDI as jest.Mock).mockResolvedValue(mockResponse);

    render(
      <EDIParser
        setOutput={mockSetOutput}
        setOutputType={mockSetOutputType}
        setErrors={mockSetErrors}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter EDI text"), {
      target: { value: "LIN+1+I'" },
    });

    fireEvent.click(screen.getByRole("button", { name: /parse edi/i }));

    await waitFor(() => {
      expect(api.ediService.decodeEDI).toHaveBeenCalledWith("LIN+1+I'");
    });

    expect(mockSetOutput).toHaveBeenCalledWith(
      JSON.stringify(mockResponse.cargo_items, null, 2)
    );
    expect(mockSetOutputType).toHaveBeenCalled();
    expect(mockSetErrors).toHaveBeenCalledWith([]);
  });

  it("handles API failure gracefully", async () => {
    (api.ediService.decodeEDI as jest.Mock).mockRejectedValue(
      new Error("fail")
    );

    render(
      <EDIParser
        setOutput={mockSetOutput}
        setOutputType={mockSetOutputType}
        setErrors={mockSetErrors}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter EDI text"), {
      target: { value: "bad edi data" },
    });

    fireEvent.click(screen.getByRole("button", { name: /parse edi/i }));

    await waitFor(() => {
      expect(mockSetErrors).toHaveBeenCalledWith([
        { message: ErrorMessages.EDI.DECODE_FAILED },
      ]);
    });
  });
});
