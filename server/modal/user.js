import { DataTypes } from 'sequelize';
import  sequelize  from '../config.js'; 

const User = sequelize.define('User', {
  email :{
    type : DataTypes.STRING,
    primaryKey : true,
    validate:{
      isEmail:true,
    }
    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  
});

export default User;
