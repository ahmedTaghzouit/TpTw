import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const Fleur = sequelize.define('Fleur',{
name:{
    type:DataTypes.STRING,
    primaryKey : true,
},
description:{
    type:DataTypes.STRING,
    allowNull: false,
    
},
prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
}

});
export default Fleur;