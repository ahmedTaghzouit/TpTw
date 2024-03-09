import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
  });
  // sequelize.sync({ force: true }).then(() => {
  //   console.log('Tables synchronisées avec la base de données');
  // });

  export default sequelize;