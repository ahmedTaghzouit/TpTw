import { BOOLEAN, DataTypes } from "sequelize";
import sequelize from "../config.js";

const UserBouquet = sequelize.define('Userbouquet',{
    nameBouquet:{
        type :DataTypes.STRING,
        primaryKey:true
    },
    emailUser:{
        type :DataTypes.STRING,
        primaryKey:true
    },
    isLiked:{
        type:BOOLEAN,
       defaultValue:false
    }

})
export default UserBouquet;