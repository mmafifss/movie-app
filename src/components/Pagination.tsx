import React from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  border: none;
  background-color: ${(props) => (props.isActive ? "#e50914" : "#333")};
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.isActive ? "default" : "pointer")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#e50914" : "#444")};
  }

  &:disabled {
    background-color: #222;
    color: #666;
    cursor: not-allowed;
  }
`;

const PageIndicator = styled.span`
  color: #aaa;
  margin: 0 0.5rem;
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageButtons = () => {
    const buttons = [];

    buttons.push(
      <PageButton
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </PageButton>
    );

    if (currentPage > 3) {
      buttons.push(
        <PageButton key={1} onClick={() => onPageChange(1)}>
          1
        </PageButton>
      );
      if (currentPage > 4) {
        buttons.push(<PageIndicator key="ellipsis1">...</PageIndicator>);
      }
    }

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      buttons.push(
        <PageButton
          key={i}
          isActive={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </PageButton>
      );
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        buttons.push(<PageIndicator key="ellipsis2">...</PageIndicator>);
      }
      buttons.push(
        <PageButton key={totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </PageButton>
      );
    }

    buttons.push(
      <PageButton
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </PageButton>
    );

    return buttons;
  };

  if (totalPages <= 1) return null;

  return <PaginationContainer>{renderPageButtons()}</PaginationContainer>;
};

export default Pagination;
