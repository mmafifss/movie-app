import React from "react";
import styled from "styled-components";

interface ButtonProps {
  primary?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const StyledButton = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;

  ${(props) =>
    props.primary
      ? `
    background-color: #e50914;
    color: white;
    border: none;
    
    &:hover {
      background-color: #f40612;
    }
    
    &:disabled {
      background-color: #b3b3b3;
      cursor: not-allowed;
    }
  `
      : `
    background-color: transparent;
    color: #e50914;
    border: 2px solid #e50914;
    
    &:hover {
      background-color: rgba(229, 9, 20, 0.1);
    }
    
    &:disabled {
      border-color: #b3b3b3;
      color: #b3b3b3;
      cursor: not-allowed;
    }
  `}
`;

const Button: React.FC<ButtonProps> = ({
  primary = false,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  children,
}) => {
  return (
    <StyledButton
      primary={primary}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
