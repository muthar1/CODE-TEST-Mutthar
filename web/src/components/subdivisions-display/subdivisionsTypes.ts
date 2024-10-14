export interface ISubdivision {
  id: number;
  code: string;
  name: string;
  longitude: number;
  latitude: number;
  fieldSurveyTerritoryId: number;
  marketId: number;
  subdivisionStatusId: number;
  surveyMethodId: number;
  activeSections: number;
  futureSections: number;
  builtOutSections: number;
  totalLots: number;
  fieldSurveyTerritoryName: string;
  marketName: string;
  marketAbbreviation: string;
  subdivisionStatusCode: string;
  surveyMethodCode: string;
  county: string;
  community: string | null;
  zoom17Date: string;
  zoom18Date: string;
  subdivisionGeometryId: number | null;
  subdivisionGeometryBoundingBoxId: number | null;
  subdivisionGeometryBoundaryId: number | null;
  subdivisionGeometryIntelligenceBoundaryId: number;
  subdivisionGeometryIntelligenceBoundaryStatusId: number;
  subdivisionGeometryIntelligenceBoundaryStatusCode: string;
  subdivisionGeometryIntelligenceBoundaryStatusChangeDate: string;
  nearMapImageDate: string;
  imageBoxId: number;
  mostRecentIPointBatchDate: string;
  iPoints: any | null; // Adjust type as necessary based on actual structure
  validatediPoints: any | null; // Adjust type as necessary based on actual structure
  subdivisionSpecificStatus: string;
}

export interface ISubdivisionAPIData {
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  totalPages: number;
  data: ISubdivision[];
}

export interface ISubdivisionFilters {
  filterByKey: string | null;
  filterByValue: string | null;
  sortKey: string | null;
  sortOrder: string | null;
  page: number;
  limit: number;
}
