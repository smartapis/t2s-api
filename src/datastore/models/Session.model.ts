import { DataTypes, Model ,fn as SeqFn, col as SeqCol, Op as SeqOp} from "sequelize";
import { sequelize } from "../index";


export default class Session extends Model {}


Session.init(
  {
    id:{
      type: DataTypes.UUIDV4,
      primaryKey : true,
      field : 'Id'
    },
    expiresOn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field : 'ExpiresOn'
    },
    info: {
      type: DataTypes.JSON,
      allowNull: false,
      field : 'Info'
    }
  },
  {
    sequelize,
    tableName : 'session',
    underscored: false,
    timestamps: false
  }
);

export const SESSION_SCOPES = {
  VALID_ONLY : 'validOnly',
}

Session.addScope(SESSION_SCOPES.VALID_ONLY,{
  attributes : ['info', 'expiresOn'],
  where : {
      expiresOn : {[SeqOp.gte]: Math.floor(new Date().getTime()/1000)}
  }
})

