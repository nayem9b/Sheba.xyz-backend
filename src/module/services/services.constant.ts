export const serviceSearchableFields = [
  "name",
  "location",
  // "searchTerm",
  // "category",
  // "title",
];

export const servicesFilterableFields = ["name", "search", "location"];

export type IServicesFilter = {
  searchTerm?: string;
};
