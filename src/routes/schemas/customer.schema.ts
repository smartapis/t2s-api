  
  export const CustomerFetchMultipleSchema = {
    type: "object",
    properties: {
      getAll: { type: "boolean" },
      searchKey: { type: "string", minLength: 3, maxLength: 30 },
      storeId : {type : "number"},
      offset: { type: "number" },
      limit: { type: "number" },
    },
  };
  
  export const CustomerCreationSchema = {
    type: "object",
    required:["storeId",'firstName','lastName','email','phone'],
    properties: {
      storeId:{type : "number"},
      firstName: { type: "string", minimum: 2, maximum: 100 },
      lastName: { type: "string", minimum: 1, maximum: 100 },
      email: { type: "string", format: "email" },
      phone: { type: "string", minimum: 3, maximum: 30 }
    },
  };
  