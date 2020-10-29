import {Sequelize} from "sequelize";

export const sequelize = new Sequelize(process.env.DATASTORE_CONNECTION_STRING as string,{dialect:"mysql",pool: {
    max: 10,
    min: 1,
    acquire: 30000,
    idle: 30000
  }});


import Store from "./models/Store.model";
import Customer from "./models/Customer.model";


Store.hasMany(Customer, {
    foreignKey : 'StoreId',
});
Customer.belongsTo(Store, {
    foreignKey: 'StoreId'
});


export const init = async ()=>{ 
    try{
        let result = await sequelize.authenticate();
        return true;
    }
    catch(err){
        throw err;
    }
} 