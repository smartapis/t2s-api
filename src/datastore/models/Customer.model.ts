import { DataTypes, Model, Deferrable ,fn as SeqFn, col as SeqCol} from "sequelize";
import { sequelize } from "../index";

import StoreModel from "./Store.model";

export default class Customer extends Model {}

Customer.init(
  {
    id:{
      type: DataTypes.MEDIUMINT,
      autoIncrement : true,
      primaryKey : true,
      field : 'Id'
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: StoreModel,
        key: "id",
        deferrable: new Deferrable.INITIALLY_IMMEDIATE(),
      },
      field : 'StoreId'
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field : 'Firstname'
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field : 'Lastname'
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field : 'Phone'
    },
    email: {
      type: DataTypes.STRING(300),
      allowNull: false,
      field : 'Email'
    }
  },
  {
    sequelize,
    tableName : 'customer',
    underscored: false,
    timestamps: false
  }
);

export const CUSTOMER_SCOPES = {
  WITH_MIN_INFO : 'withMinInfo',
}

Customer.addScope(CUSTOMER_SCOPES.WITH_MIN_INFO,{
  attributes : ['firstName','lastName', 'email']
})