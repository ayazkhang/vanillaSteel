import { Sequelize } from 'sequelize';
import config from "./config";

const environment = 'development';
const dbConfig = config[environment];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

export default sequelize;