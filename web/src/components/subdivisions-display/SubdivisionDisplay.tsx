import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { ISubdivisionAPIData, ISubdivisionFilters } from "./subdivisionsTypes";
import { AxiosResponse } from "axios";
import SubdivisionTable from "./SubdivisionsTable";
import { SubdivisionContainer, SubdivisionHeading } from "./SubdivisionsStyled";
export const SubdivisionDisplay = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subdivisionsData, setSubdivisionsData] = useState<ISubdivisionAPIData>(
    {
      total: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      page: 1,
      totalPages: 1,
      data: [],
    }
  );
  const [subDivisionFilters, setSubDivisionFilters] =
    useState<ISubdivisionFilters>({
      filterByKey: null,
      filterByValue: null,
      sortKey: null,
      sortOrder: null,
      page: 1,
      limit: 10,
    });

  const getSubdivisions = () => {
    setIsLoading(true);
    axios
      .get("/subdivision", { params: subDivisionFilters })
      .then((response: AxiosResponse<ISubdivisionAPIData>) => {
        console.log("response is ", response.data);
        setSubdivisionsData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getSubdivisions();
  }, [subDivisionFilters]);

  const handleSubdivisionFiltersChange = (filters: ISubdivisionFilters) => {
    setSubDivisionFilters({ ...subDivisionFilters, ...filters });
  };

  return (
    <SubdivisionContainer>
      <SubdivisionHeading>Subdivisions</SubdivisionHeading>
      <p>Display subdivision data here</p>
      <SubdivisionTable
        loading={isLoading}
        subdivisionsData={subdivisionsData}
        handleSubdivisionFiltersChange={handleSubdivisionFiltersChange}
        subDivisionFilters={subDivisionFilters}
      />
    </SubdivisionContainer>
  );
};
