const {
  getSubDivisions,
} = require("../../src/controllers/SubdivisionController");
const fs = require("fs");
const utils = require("../../src/utils");

jest.mock("fs");
jest.mock("../../src/utils");

describe("getSubDivisions", () => {
  const mockRequest = (query) => ({ query });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return filtered, sorted, and paginated subdivisions", async () => {
    const req = mockRequest({
      filterByKey: "country",
      filterByValue: "US",
      sortKey: "name",
      sortOrder: "asc",
      page: 1,
      limit: 5,
    });
    const res = mockResponse();

    const mockData = {
      subdivisions: [
        { id: 26951, code: "001B3", name: "Alexander Park", country: "US" },
        {
          id: 26952,
          code: "001D7",
          name: "Searchlight and Airpark",
          country: "CA",
        },
      ],
    };

    fs.readFileSync.mockReturnValue(JSON.stringify(mockData));

    // Filter data by country
    const filteredData = mockData.subdivisions.filter(
      (subdivision) => subdivision.country === "US"
    );
    const sortedData = [mockData.subdivisions[0]]; // Expected sorted data
    const paginatedData = [mockData.subdivisions[0]]; // Expected paginated data

    utils.sortArray.mockReturnValue(sortedData);
    utils.paginateData.mockReturnValue(paginatedData);
    utils.sendResponse.mockImplementation((res, status, message, data) => {
      res.status(status).json({ message, data });
    });

    await getSubDivisions(req, res);

    expect(fs.readFileSync).toHaveBeenCalledWith("data/subdivision.json");
    expect(utils.sortArray).toHaveBeenCalledWith(filteredData, "name", "asc");
    expect(utils.paginateData).toHaveBeenCalledWith(sortedData, 1, 5);
    expect(utils.sendResponse).toHaveBeenCalledWith(
      res,
      200,
      "Success",
      paginatedData
    );
  });

  test("should return 500 on error", async () => {
    const req = mockRequest({});
    const res = mockResponse();

    fs.readFileSync.mockImplementation(() => {
      throw new Error("File read error");
    });

    await getSubDivisions(req, res);

    expect(utils.sendResponse).toHaveBeenCalledWith(
      res,
      500,
      "Internal Server Error",
      undefined,
      expect.any(Error)
    );
  });

  // Uncomment and fix the remaining tests as necessary.
  // test('should return paginated subdivisions with default parameters when no query params are provided', async () => {

  // test('should return empty array if filter key or value does not match any data', async () => {

  // test('should handle invalid sort key gracefully', async () => {

  // test('should handle invalid pagination parameters by applying defaults', async () => {

  // test('should sort subdivisions in descending order when sortOrder is desc', async () =>
});
