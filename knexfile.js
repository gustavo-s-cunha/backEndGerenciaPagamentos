"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const knex_1 = require("./src/config/knex");
exports.default = {
    ...knex_1.knexConfig,
    migrations: {
        directory: "./src/infra/database/migrations"
    }
};
