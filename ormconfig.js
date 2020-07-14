require("dotenv").config();

const { SnakeNamingStrategy } = require("typeorm-naming-strategies");

module.exports = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  cli: {
    migrationsDir: "./server/migration",
    entitiesDir: "./server/entity",
  },
  migrationsRun: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ["server/entity/**/*.{ts,js}"],
  migrations: ["server/migration/**/*.{ts,js}"],
};
