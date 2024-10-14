import { styled } from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

export const PaginationSelect = styled.select`
  margin-right: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const PaginationButton = styled.button<{ disabled: boolean }>`
  padding: 8px 12px;
  margin: 0 4px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#5d3ad8")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 16px;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#0056b3")};
  }
`;

export const PaginationPageInfo = styled.span`
  margin: 0 16px;
  font-size: 16px;
`;
