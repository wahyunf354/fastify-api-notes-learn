const fastify = require("fastify");

module.exports = function setupEnvironmentTest() {
  // setup environment test
  process.env.POSTGRES_URI =
    "postgres://notes_admin:localhost@localhost:5422/notes_db_test";

  // setup fastify server
  const server = fastify({
    logger: {
      level: process.env.LOG_LEVEL || "silent",
    },
    pluginTimeout: 2 * 60 * 1000,
  });

  // setup test lifecycle hooks
  beforeAll();
  // return our fastify server
};
