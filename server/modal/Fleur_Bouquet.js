import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const Fleur_Bouquet = sequelize.define('Fleur_bouquet',{
    nameBouquet:{
        type :DataTypes.STRING,
        primaryKey:true
    },
    nameFleur:{
        type :DataTypes.STRING,
        primaryKey:true
    },
    quantite:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

})
export default Fleur_Bouquet;

//bouquet1
// fleur1
//10

//bouquet1
// fleur2
//10