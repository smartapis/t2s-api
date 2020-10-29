import {upperFirst} from "lodash";
import { StoreService } from "../services/Store.service";

export module StoreController {
  export const getStore = async (req, reply) => {
    //extract id from params
    const { id } = req.params;
      try {
        let result = await StoreService.getStoreById(id);

        if (result) {
          return result;
        } else {
          reply.code(422);
          return {
            statusCode: 422,
            error: "STORE_ERR_2",
          };
        }
      } catch (err) {
        req.log.info(err);
        reply.code(500);
        return {
          statusCode: 500,
          error: "STORE_ERR_500",
        };
      }
  };

  export const getStores = async (req, reply) => {
    try {
      let result = await StoreService.getStores(req.query);

      if (result) {
        return result;
      } else {
        reply.code(422);
        return {
          statusCode: 422,
          error: "STORE_ERR_3",
        };
      }
    } catch (err) {
      req.log.info(err);
      reply.code(500);
      return {
        statusCode: 500,
        error: "STORE_ERR_500",
      };
    }
  };

  export const updateStore = async (req, reply) => {
    const { id } = req.params;
      try {
        let store = await StoreService.getStoreById(id);

        if (store) {
          let formattedStoreDetails = formatStoreDetails(req.body)
          let result = await StoreService.updateStore({...formattedStoreDetails,id})
          return {message : 'success'}
        } else {
          reply.code(422);
          return {
            statusCode: 422,
            error: "STORE_ERR_2",
          };
        }
      } catch (err) {
        req.log.info(err);
        reply.code(500);
        return {
          statusCode: 500,
          error: "STORE_ERR_500",
        };
      }
    
  };
  export const getStoresWithCustomerCount = async (req, reply) => {
    try {
      let result = await StoreService.getStoresWithCustomerCount();

      if (result) {
        return result;
      } else {
        reply.code(422);
        return {
          statusCode: 422,
          error: "STORE_ERR_4",
        };
      }
    } catch (err) {
      req.log.info(err);
      reply.code(500);
      return {
        statusCode: 500,
        error: "STORE_ERR_500",
      };
    }
  };
}


const formatStoreDetails = (_store)=>{
  let store = {..._store}
  if(store.name){
    store.name = store.name.trim();
    store.name = store.name.split(" ").map(ch=>upperFirst(ch)).join(" ")
  }
  if(store.phone){
    store.phone = store.phone.trim();
  }
  if(store.domain){
    store.domain = store.domain.trim().toLowerCase();
  }
  return store;
}