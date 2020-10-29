import {upperFirst} from "lodash";
import { CustomerService } from "../services/Customer.service";
import ApplicationError from "../utils/ApplicationError";

export module CustomerController {
  export const getCustomer = async (req, reply) => {
    //input with params
    const { id } = req.params;
    if (isFinite(id)) {
      //id should not be null/undefined/0 and should be valid number
      try {
        let result = await CustomerService.getCustomerById(id);

        if (result) {
          return result;
        } else {
          reply.code(422);
          return {
            statusCode: 422,
            error: "CUSTOMER_ERR_2",
          };
        }
      } catch (err) {
        req.log.info(err);
        reply.code(500);
        return {
          statusCode: 500,
          error: "CUSTOMER_ERR_500",
        };
      }
    } else {
      reply.code(422);
      return { app_err_code: "CUSTOMER_ERR_1" };
    }
  };

  export const getCustomers = async (req, reply) => {
    try {
      let result = await CustomerService.getCustomers(req.query);

      if (result) {
        return result;
      } else {
        reply.code(422);
        return {
          statusCode: 422,
          error: "CUSTOMER_ERR_3",
        };
      }
    } catch (err) {
      req.log.info(err);
      reply.code(500);
      return {
        statusCode: 500,
        error: "CUSTOMER_ERR_500",
      };
    }
  };

  export const createCustomer = async (req, reply) => {
      try {
          let formattedCustomerDetails = formatCustomerDetails(req.body)
          let result = await CustomerService.createCustomer(formattedCustomerDetails)
          return result;
        
      } catch (err) {
        req.log.info(err);
        if(!(err instanceof ApplicationError)){
          err = new ApplicationError();
        }
        reply.code(err.httpStatusCode);
        return {
          message: err.message,
        };
      }
  };
}


const formatCustomerDetails = (_customer)=>{
  let customer = {..._customer}
  if(customer.firstName){
    customer.firstName = customer.firstName.trim();
    customer.firstName.split(" ").map(ch=>upperFirst(ch)).join(" ")
  }
  if(customer.lastName){
    customer.lastName = customer.lastName.trim();
    customer.lastName.split(" ").map(ch=>upperFirst(ch)).join(" ")
  }
  if(customer.phone){
    customer.phone = customer.phone.trim();
  }
  if(customer.email){
    customer.email = customer.email.trim().toLowerCase();
  }
  return customer;
}
