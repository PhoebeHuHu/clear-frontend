import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "jest-styled-components";
import Button from "../Button";

describe("Button", () => {
  it("renders filled button with correct styles", () => {
    render(<Button variant="filled">Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveStyleRule("background-color", "#fafafa");
    expect(button).toHaveStyleRule("color", "#000");
  });

  it("renders outlined button with correct styles", () => {
    render(<Button variant="outlined">Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveStyleRule("background-color", "transparent");
    expect(button).toHaveStyleRule("border", "1px solid #444");
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalled();
  });
});
