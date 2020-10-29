export const StoreFetchSingleSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "integer", minimum : 1 },
  },
};

export const StoreFetchMultipleSchema = {
  type: "object",
  properties: {
    getAll: { type: "boolean" },
    searchKey: { type: "string", minLength: 3, maxLength: 30 },
    offset: { type: "number" },
    limit: { type: "number" },
  },
};

export const StoreUpdateSchema = {
  type: "object",
  properties: {
    phone: { type: "string", minimum: 3, maximum: 30 },
    name: { type: "string", minimum: 2, maximum: 100 },
    domain: { type: "number", format: "hostname" },
    status : {type : "boolean"},
    street : {type : "string"},
    state : {type:"string"}
  },
};
