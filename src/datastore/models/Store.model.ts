import { DataTypes, Model ,fn as SeqFn, col as SeqCol} from "sequelize";
import { sequelize } from "../index";

import CustomerModel from "./Customer.model";

export default class Store extends Model {}


Store.init(
  {
    id:{
      type: DataTypes.MEDIUMINT,
      autoIncrement : true,
      primaryKey : true,
      field : 'Id'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field : 'Name'
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field : 'Phone'
    },
    domain: {
      type: DataTypes.STRING(300),
      allowNull: false,
      field : 'Domain'
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : true,
      field : 'Status'
    },
    street: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field : 'Street'
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field : 'State'
    },
  },
  {
    sequelize,
    tableName : 'store',
    underscored: false,
    timestamps: false
  }
);
export const STORE_SEARCH_FIELDS = ['name'];

export const STORE_SCOPES = {
  WITH_HEADERS_ONLY : 'withHeadersOnly',
  WITH_HEADERS_AND_CUSTOMER_COUNT : 'withHeadersAndCustomerCount'
}

Store.addScope(STORE_SCOPES.WITH_HEADERS_ONLY,{
  attributes : ['id', 'name']
})


Store.addScope(STORE_SCOPES.WITH_HEADERS_AND_CUSTOMER_COUNT,{
  attributes :['id','name',[SeqFn('count', SeqCol('Customers.id')), 'totalCustomerCount']],
  include:{
    model : CustomerModel,
    as : 'Customers',
    attributes : []
  },
  group:['Store.id']

})