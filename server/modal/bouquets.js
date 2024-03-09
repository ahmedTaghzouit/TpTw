
import { DataTypes } from 'sequelize';
import  sequelize  from '../config.js'; 

const Bouquet = sequelize.define('Bouquet', {
  id :{
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement :true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
  },
  prix: {
    type: DataTypes.FLOAT,
  },

  hasFleur:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }
});

export default Bouquet;
