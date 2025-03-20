import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const SearchForm = styled.form`
  display: flex;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #333;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  background-color: #333;
  color: #fff;

  &:focus {
    outline: none;
    border-color: #e50914;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SearchButton = styled(Button)`
  border-radius: 0 4px 4px 0;
  padding: 0.75rem 1.5rem;
`;

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialQuery = "",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          ref={inputRef}
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButton primary type="submit">
          Search
        </SearchButton>
      </SearchForm>
    </SearchContainer>
  );
};

export default SearchBar;
