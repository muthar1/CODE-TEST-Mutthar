import React from "react";
import { TableCell } from "./StyledTable";

const SortableTableCell = ({
  text,
  sortColumn,
  sortDirection,
  handleSort,
  id,
}: {
  text: string;
  sortColumn?: string | null;
  sortDirection?: string | null;
  handleSort?: (column: string) => void;
  id?: string;
}) => {
  const handleCellClick = () => {
    if (handleSort && id) {
      handleSort(id);
    }
  };

  return (
    <TableCell onClick={handleCellClick}>
      {text}
      {sortColumn && sortColumn === id
        ? sortDirection === "asc"
          ? "▲"
          : "▼"
        : null}
    </TableCell>
  );
};

export default SortableTableCell;
