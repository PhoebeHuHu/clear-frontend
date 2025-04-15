import React from "react";
import styled from "styled-components";
type InputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: white;
`;

const Input = styled.input`
  background-color: #333;
  color: white;
  border: 1px solid #444;
  padding: 10px;
  border-radius: 6px;
  width: 100%;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #999;
  }

  &::placeholder {
    color: #666;
  }
`;

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <Wrapper>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Input ref={ref} id={inputId} {...props} />
      </Wrapper>
    );
  }
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
