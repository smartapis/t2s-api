import {
  where as SeqWhere,
  fn as SeqFn,
  col as SeqCol,
  Op as SeqOp,
  ForeignKeyConstraintError,
} from "sequelize";
import ApplicationError, { APP_ERROR_CODES } from "../utils/ApplicationError";
import CustomerModel, {
  CUSTOMER_SCOPES,
} from "../datastore/models/Customer.model";
import { stringify } from "querystring";

const CUSTOMER_FETCH_PAGE_SIZE = { DEFAULT: 5, MAX: 20 };
const CUSTOMER_SEARCH_FIELDS = ["firstName", "lastName", "email"];
export module CustomerService {
  export const getCustomerById = async (id) => {
    try {
      let result = await CustomerModel.findByPk(id);
      return result;
    } catch (err) {
      throw err;
    }
  };
  export const getCustomers = async ({
    getAll,
    storeId,
    searchKey,
    limit,
    offset,
  }) => {
    try {
      let filterObj = {};

      if (searchKey) {
        Object.assign(filterObj, {
          where: {
            [SeqOp.or]: CUSTOMER_SEARCH_FIELDS.map((c) =>
              SeqWhere(SeqFn("lower", SeqCol(c)), {
                [SeqOp.like]: `%${searchKey.toLowerCase()}%`,
              })
            ),
          },
        });
      }
      if (storeId) {
        if (!filterObj.hasOwnProperty("where"))
          Object.assign(filterObj, { where: {} });
        Object.assign((filterObj as any).where, { storeId });
      }
      if (!getAll)
        Object.assign(filterObj, { limit: CUSTOMER_FETCH_PAGE_SIZE.DEFAULT });
      if (limit)
        Object.assign(filterObj, {
          limit:
            limit > CUSTOMER_FETCH_PAGE_SIZE.MAX
              ? CUSTOMER_FETCH_PAGE_SIZE.MAX
              : limit,
        });
      if (offset) Object.assign(filterObj, { offset });

      let result = await CustomerModel.scope(
        CUSTOMER_SCOPES.WITH_MIN_INFO
      ).findAll(filterObj);
      return result;
    } catch (err) {
      throw err;
    }
  };

  export const createCustomer = async (customerObj) => {
    try {
      let result = await CustomerModel.create(customerObj);
      return result;
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        throw new ApplicationError(APP_ERROR_CODES.CST_SVC_1);
      }else{
        throw new ApplicationError(APP_ERROR_CODES.UNKNOWN_0,JSON.stringify({input : customerObj,function : 'createCustomer'}))
      }
    }
  };
}
