import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import {
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY,
  EODE_ENV_KEY,
} from './common/const/env-kets.const';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env[ENV_DB_HOST_KEY],
  port: parseInt(process.env[ENV_DB_PORT_KEY] ?? '5432', 10),
  username: process.env[ENV_DB_USERNAME_KEY],
  password: process.env[ENV_DB_PASSWORD_KEY],
  database: process.env[ENV_DB_DATABASE_KEY],
  migrationsRun: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/**/*.entity.js'],
  synchronize: process.env[EODE_ENV_KEY] === 'development' ? true : false,
  migrations: ['dist/database/migrations/*.js'],
});
