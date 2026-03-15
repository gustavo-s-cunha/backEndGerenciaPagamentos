
import 'dotenv/config';
import type { Knex } from 'knex';
import { knexConfig } from './src/config/knex.js';

const config: Knex.Config = {
  ...knexConfig,
  migrations: {
    directory: './src/infra/database/migrations',
    loadExtensions: ['.ts', '.js'],
  }
};

export default config;