const pgp = require("pg-promise")();
const appConfig = require("../config/appConfig.js");
const DbMigrate = require("db-migrate");
const fp = require("fastify-plugin");

function runMigration() {
  return new Promise((resolve, reject) => {
    const dbMigrate = DbMigrate.getInstance(true);

    dbMigrate.silence(true);

    dbMigrate.up((error, result = []) => {
      if (error) {
        return reject(error);
      }

      if (result.length > 0) {
        return resolve(result);
      }
    });
  });
}

module.exports = fp(async function (fastify, opts) {
  const db = pgp(appConfig.postgresUri);

  fastify.decorate("db", db);
  const migrationsRan = await runMigration();

  fastify.log.info({
    migrationCount: migrationsRan.length,
    msg: "Successfull migration run",
  });
});
