import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { SubdivisionDisplay } from "./SubdivisionDisplay";
import axios from "../../utils/axiosInstance";
import { ISubdivisionAPIData } from "./subdivisionsTypes";

describe("SubdivisionDisplay Component", () => {
  it("renders learn prompt to create display component", () => {
    render(<SubdivisionDisplay />);
    const prompt = screen.getByText("Display subdivision data here");
    expect(prompt).toBeInTheDocument();
  });
});

// Mock axios
jest.mock("../../utils/axiosInstance");

describe("SubdivisionDisplay", () => {
  const mockData: ISubdivisionAPIData = {
    total: 10,
    hasNextPage: true,
    hasPreviousPage: false,
    page: 1,
    totalPages: 2,
    data: [
      {
        id: 1,
        name: "Subdivision 1",
        subdivisionStatusCode: "Active",
        nearMapImageDate: "2023-06-17T18:02:42.000Z",
        code: "",
        longitude: 0,
        latitude: 0,
        fieldSurveyTerritoryId: 0,
        marketId: 0,
        subdivisionStatusId: 0,
        surveyMethodId: 0,
        activeSections: 0,
        futureSections: 0,
        builtOutSections: 0,
        totalLots: 0,
        fieldSurveyTerritoryName: "",
        marketName: "",
        marketAbbreviation: "",
        surveyMethodCode: "",
        county: "",
        community: null,
        zoom17Date: "",
        zoom18Date: "",
        subdivisionGeometryId: null,
        subdivisionGeometryBoundingBoxId: null,
        subdivisionGeometryBoundaryId: null,
        subdivisionGeometryIntelligenceBoundaryId: 0,
        subdivisionGeometryIntelligenceBoundaryStatusId: 0,
        subdivisionGeometryIntelligenceBoundaryStatusCode: "",
        subdivisionGeometryIntelligenceBoundaryStatusChangeDate: "",
        imageBoxId: 0,
        mostRecentIPointBatchDate: "",
        iPoints: undefined,
        validatediPoints: undefined,
        subdivisionSpecificStatus: "",
      },
    ],
  };

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the SubdivisionDisplay component", async () => {
    render(<SubdivisionDisplay />);

    // Check if the loading skeleton or spinner is present
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText(/subdivision 1/i)).toBeInTheDocument();
    });
  });

  it("calls the getSubdivisions API on component load", async () => {
    render(<SubdivisionDisplay />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/subdivision", {
        params: {
          filterByKey: null,
          filterByValue: null,
          sortKey: null,
          sortOrder: null,
          page: 1,
          limit: 10,
        },
      });
    });
  });

  it("updates filters when handleStatusFilterChange is called", async () => {
    render(<SubdivisionDisplay />);

    // Wait for initial data load
    await waitFor(() => screen.getByText(/subdivision 1/i));

    // Simulate filter change
    const filterDropdown = screen.getByLabelText(/status filter/i);
    fireEvent.change(filterDropdown, { target: { value: "Active" } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/subdivision", {
        params: {
          filterByKey: "subdivisionStatusCode",
          filterByValue: "Active",
          sortKey: null,
          sortOrder: null,
          page: 1,
          limit: 10,
        },
      });
    });
  });

  it("displays subdivisions data in the table", async () => {
    render(<SubdivisionDisplay />);

    await waitFor(() => {
      expect(screen.getByText(/subdivision 1/i)).toBeInTheDocument();
    });
  });
});
