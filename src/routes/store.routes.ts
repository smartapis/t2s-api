import {
  StoreFetchSingleSchema,
  StoreFetchMultipleSchema,
  StoreUpdateSchema
  } from "./schemas/store.schema";

import { StoreController } from "../controllers/Store.controller";

export default [
    {
      method: "GET",
      url: "/store/:id",
      schema:{
        tags : ['stores'],
        params : StoreFetchSingleSchema
      },
      handler: StoreController.getStore,
      type : 'protected'
    },
    {
      method: "PUT",
      url: "/store/:id",
      schema:{
        tags : ['stores'],
        params : StoreFetchSingleSchema,
        body : StoreUpdateSchema
      },
      handler: StoreController.updateStore,
      type : 'protected'
    },
    {
      method: "GET",
      url: "/stores",
      schema:{
        tags : ['stores'],
        query : StoreFetchMultipleSchema
      },
      handler: StoreController.getStores,
      type : 'protected'
    },
    {
      method: "GET",
      url: "/stores_with_customer_count",
      schema:{
        tags : ['stores']
      },
      handler: StoreController.getStoresWithCustomerCount,
      type : 'protected'
    }]