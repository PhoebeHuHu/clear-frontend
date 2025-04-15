"use client";
import React from "react";
import styled from "styled-components";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
}

const ButtonStyled = styled.button<IButtonProps>`
  background-color: ${({ variant }) =>
    variant === "filled" ? "#fafafa" : "transparent"};
  color: ${({ variant }) => (variant === "filled" ? "#000" : "#fafafa")};
  padding: 10px 20px;
  border: ${({ variant }) =>
    variant === "filled" ? "none" : "1px solid #444"};
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: ${({ variant }) =>
      variant === "filled" ? "#999" : "transparent"};
    border-color: ${({ variant }) =>
      variant === "outlined" ? "#999" : "none"};
  }
  transition: all 0.3s ease;
`;

const Button = ({
  variant = "filled",
  children,
  onClick,
  ...props
}: IButtonProps) => {
  return (
    <ButtonStyled variant={variant} onClick={onClick} {...props}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
