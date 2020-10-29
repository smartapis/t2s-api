import {
  where as SeqWhere,
  fn as SeqFn,
  col as SeqCol,
  Op as SeqOp,
} from "sequelize";

import StoreModel, { STORE_SCOPES } from "../datastore/models/Store.model";

const STORE_FETCH_PAGE_SIZE = { DEFAULT: 5, MAX: 20 };
const STORE_SEARCH_FIELDS = ["name"];
export module StoreService {
  export const getStoreById = async (id) => {
    try {
      let result = await StoreModel.findByPk(id);
      return result;
    } catch (err) {
      throw err;
    }
  };
  export const getStores = async ({ getAll, searchKey, limit, offset }) => {
    try {
      let filterObj = {};

      if (searchKey) {
        Object.assign(filterObj, {
          where: {
            [SeqOp.or]: STORE_SEARCH_FIELDS.map((c) =>
              SeqWhere(SeqFn("lower", SeqCol(c)), {
                [SeqOp.like]: `%${searchKey.toLowerCase()}%`,
              })
            ),
          },
        });
      }

      if (!getAll)
        Object.assign(filterObj, { limit: STORE_FETCH_PAGE_SIZE.DEFAULT });
      if (limit)
        Object.assign(filterObj, {
          limit:
            limit > STORE_FETCH_PAGE_SIZE.MAX
              ? STORE_FETCH_PAGE_SIZE.MAX
              : limit,
        });
      if (offset) Object.assign(filterObj, { offset });

      let result = await StoreModel.scope(
        STORE_SCOPES.WITH_HEADERS_ONLY
      ).findAll(filterObj);
      return result;
    } catch (err) {
      throw err;
    }
  };

  export const getStoresWithCustomerCount = async () => {
    try {
      let result = await StoreModel.scope(
        STORE_SCOPES.WITH_HEADERS_AND_CUSTOMER_COUNT
      ).findAll();
      return result;
    } catch (err) {
      throw err;
    }
  };

  export const updateStore = async (storeObj) => {
    try {
      let result = await StoreModel.update(storeObj, {
        where: { id: storeObj.id },
      });
      return result[0];
    } catch (err) {
      throw err;
    }
  };
}
