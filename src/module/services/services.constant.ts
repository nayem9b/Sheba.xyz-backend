export const serviceSearchableFields = [
  "name",
  "location",
  // "searchTerm",
  // "category",
  // "title",
];

export const servicesFilterableFields = ["name", "search", "location"];

export type IservicesFilterRequest = {
  search?: string;
  searchTerm?: string;
  name?: string;
  location?: string;
  // category?: string;
  // title?: string;
};
