import React from "react";
import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";

/* Wrapper */
const SearchContainer = styled.div`
  width: 100%;
  max-width: 520px;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px 16px;

  background-color: #020617; /* darker than page bg */
  border: 1px solid #1e293b;
  border-radius: 12px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
`;

/* Icon */
const SearchIcon = styled(SearchOutlined)`
  color: #7c3aed; /* purple accent */
  font-size: 22px !important;
`;

/* Input */
const SearchInput = styled.input`
  flex: 1;

  background: transparent;
  border: none;
  outline: none;

  color: #e5e7eb;
  font-size: 15px;
  font-family: "Inter", sans-serif;

  &::placeholder {
    color: #64748b;
  }
`;

const SearchBar = ({search, setSearch}) => {
  return (
    <SearchContainer>
      <SearchIcon />
      <SearchInput
        type="text"
        placeholder="Search posts, tags, creators..."
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
      />
    </SearchContainer>
  );
};

export default SearchBar;
