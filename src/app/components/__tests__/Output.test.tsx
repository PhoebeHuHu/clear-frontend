import React from "react";
import { render, screen } from "@testing-library/react";
import Output from "@/app/components/Output";
import { ICargoItem, IProcessingError } from "@/types/cargo";

jest.mock("@/app/components/EDIGenerator/components/CargoCard", () => ({
  __esModule: true,
  default: ({ item }: { item: ICargoItem }) => (
    <div data-testid="cargo-card">{item.cargo_type}</div>
  ),
}));

describe("Output", () => {
  const mockCargoItems: ICargoItem[] = [
    {
      cargo_type: "FCL",
      number_of_packages: 3,
      container_number: "XYZ123",
      master_bill_of_lading_number: "MB001",
      house_bill_of_lading_number: "HB001",
    },
    {
      cargo_type: "LCL",
      number_of_packages: 9,
      container_number: "ABC456",
      master_bill_of_lading_number: "",
      house_bill_of_lading_number: "",
    },
  ];

  it("renders EDI output correctly", () => {
    render(<Output output={"LIN+1+I'\nPAC+9+1'"} outputType="edi" />);
    expect(screen.getByText(/LIN\+1\+I'/)).toBeInTheDocument();
    expect(screen.getByText(/PAC\+9\+1'/)).toBeInTheDocument();
  });

  it("renders cargo output correctly", () => {
    render(
      <Output
        output={JSON.stringify(mockCargoItems)}
        outputType="cargo"
        errors={[]}
      />
    );
    expect(screen.getAllByTestId("cargo-card")).toHaveLength(2);
    expect(screen.getByText("FCL")).toBeInTheDocument();
    expect(screen.getByText("LCL")).toBeInTheDocument();
  });

  it("renders error messages if errors are present", () => {
    const errors: IProcessingError[] = [
      { message: "Missing field", index: 1 },
      { message: "Invalid container number" },
    ];
    render(<Output output="" outputType="edi" errors={errors} />);
    expect(screen.getByText("Errors in processing:")).toBeInTheDocument();
    expect(screen.getByText("Item 2:")).toBeInTheDocument(); // index 1 => "Item 2"
    expect(screen.getByText("Missing field")).toBeInTheDocument();
    expect(screen.getByText("Invalid container number")).toBeInTheDocument();
  });

  it("renders placeholder when output is empty", () => {
    render(<Output output="  " outputType="edi" />);
    expect(
      screen.getByText(/Cargo information and EDI message will appear/i)
    ).toBeInTheDocument();
  });
});
