import { Dialect } from 'sequelize';

interface IConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

interface IDatabaseConfig {
  development: IConfig;
  test: IConfig;
  production: IConfig;
}

const config: IDatabaseConfig = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: 'postgres',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: 'postgres',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};

export default config;
