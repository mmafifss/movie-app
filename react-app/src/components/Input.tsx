import React from "react";
import styled from "styled-components";

interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #e50914;
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.2);
  }
`;

const ErrorMessage = styled.span`
  color: #e50914;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  required = false,
  className = "",
  label,
  error,
}) => {
  return (
    <InputContainer className={className}>
      {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
      <StyledInput
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;
