import React from "react";
import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import userEvent from "@testing-library/user-event";
import BaseInput from "../BaseInput";

describe("BaseInput", () => {
  it("renders with label", () => {
    render(<BaseInput label="Username" placeholder="Enter name" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("applies correct styles", () => {
    render(<BaseInput label="Email" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveStyleRule("background-color", "#333");

    expect(input).toHaveStyleRule("color", "white");
    expect(input).toHaveStyleRule("border", "1px solid #444");
  });

  it("calls onChange when typing", async () => {
    const handleChange = jest.fn();
    render(<BaseInput onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "abc");
    expect(handleChange).toHaveBeenCalledTimes(3);
  });
});
