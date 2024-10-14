// StyledTable.js
import styled from "styled-components";

export const TableContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: #f4f4f4;
  cursor: pointer;
  color: #5d3ad8;
  font-weight: bold;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
`;
