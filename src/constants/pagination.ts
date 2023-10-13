export const paginationFields = [
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "minPrice",
  "maxPrice",
];

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
