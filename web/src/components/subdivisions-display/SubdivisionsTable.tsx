import React, { useState } from "react";
import {
  ISubdivision,
  ISubdivisionAPIData,
  ISubdivisionFilters,
} from "./subdivisionsTypes";
import {
  LoadingMessage,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "../table/StyledTable";
import {
  PaginationButton,
  PaginationContainer,
  PaginationSelect,
} from "../pagination/StyledPagination";
import SortableTableCell from "../table/SortableTableCell";
import { formatDate } from "../../utils/helperMethods";

const SubdivisionTable = ({
  loading,
  subdivisionsData,
  handleSubdivisionFiltersChange,
  subDivisionFilters,
}: {
  loading: boolean;
  subdivisionsData: ISubdivisionAPIData;
  handleSubdivisionFiltersChange: (filters: ISubdivisionFilters) => void;
  subDivisionFilters: ISubdivisionFilters;
}) => {
  const { data, hasNextPage, hasPreviousPage, page, totalPages } =
    subdivisionsData;

  const [sortColumn, setSortColumn] = useState<string | null>(null); // Track the column to sort by
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc"); // Track the sorting direction

  const handleNextPage = () => {
    if (hasNextPage) {
      handleSubdivisionFiltersChange({
        ...subDivisionFilters,
        page: subDivisionFilters.page + 1,
      });
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      handleSubdivisionFiltersChange({
        ...subDivisionFilters,
        page: subDivisionFilters.page - 1,
      });
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSubdivisionFiltersChange({
      ...subDivisionFilters,
      limit: Number(e.target.value),
      page: 1,
    });
  };

  const handleSort = (column: string) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);

    handleSubdivisionFiltersChange({
      ...subDivisionFilters,
      sortKey: column,
      sortOrder: newDirection,
      page: 1,
    });
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <SortableTableCell text={"Code"} />
              <SortableTableCell
                text={"Name"}
                sortColumn={sortColumn}
                sortDirection={subDivisionFilters.sortOrder}
                handleSort={handleSort}
                id="name"
              />
              <SortableTableCell text={"Market Name"} />
              <SortableTableCell
                text={"Near Map Image Date"}
                sortColumn={sortColumn}
                sortDirection={subDivisionFilters.sortOrder}
                handleSort={handleSort}
                id={"nearMapImageDate"}
              />
              <SortableTableCell text="Subdivision Status" />
            </TableRow>
          </TableHeader>
          {loading ? (
            <LoadingMessage>Loading...</LoadingMessage>
          ) : (
            <tbody>
              {data.map((item: ISubdivision, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.marketName}</TableCell>
                  <TableCell>{formatDate(item.nearMapImageDate)}</TableCell>
                  <TableCell>{item.subdivisionStatusCode}</TableCell>
                </TableRow>
              ))}
            </tbody>
          )}
        </Table>
      </TableContainer>
      {/* Pagination Controls */}
      <PaginationContainer style={{ marginTop: "16px" }}>
        <label htmlFor="pageSize">Page Size: </label>
        <PaginationSelect
          id="pageSize"
          value={subDivisionFilters.limit}
          onChange={handlePageSizeChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </PaginationSelect>

        <PaginationButton
          onClick={handlePreviousPage}
          disabled={!hasPreviousPage}
        >
          Previous
        </PaginationButton>
        <span>{` Page ${subDivisionFilters.page} of ${totalPages} `}</span>
        <PaginationButton onClick={handleNextPage} disabled={!hasNextPage}>
          Next
        </PaginationButton>
      </PaginationContainer>
    </div>
  );
};

export default SubdivisionTable;
