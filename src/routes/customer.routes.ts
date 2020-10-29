import {
    CustomerFetchMultipleSchema,
    CustomerCreationSchema
    } from "./schemas/customer.schema";
  
  import { CustomerController } from "../controllers/Customer.controller"
  
  export default [
      {
        method: "POST",
        url: "/customer",
        schema:{
          tags : ['customers'],
          body : CustomerCreationSchema
        },
        handler: CustomerController.createCustomer,
        type : 'protected'
      },
      {
        method: "GET",
        url: "/customers",
        schema:{
          tags : ['customers'],
          query : CustomerFetchMultipleSchema
        },
        handler: CustomerController.getCustomers,
        type : 'protected'
      }]