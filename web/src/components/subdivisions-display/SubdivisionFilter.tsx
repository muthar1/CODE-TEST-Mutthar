import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 8px;
`;

const Dropdown = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
`;

const SubdivisionFilter: React.FC<{
  onFilterChange: (status: string) => void;
}> = ({ onFilterChange }) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;
    onFilterChange(status);
  };

  return (
    <FilterContainer>
      <Label htmlFor="statusFilter">Subdivision Status</Label>
      <Dropdown
        id="statusFilter"
        onChange={handleStatusChange}
        defaultValue=""
        title="Status Filter"
        aria-label="Status Filter"
      >
        <option value="">All</option>
        <option value="Active">Active</option>
        <option value="Future">Future</option>
        <option value="Builtout">Builtout</option>
      </Dropdown>
    </FilterContainer>
  );
};

export default SubdivisionFilter;
