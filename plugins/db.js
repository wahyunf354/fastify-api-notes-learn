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

      return resolve(result);
    });
  });
}

module.exports = fp(async function (fastify) {
  const db = pgp(appConfig.postgresUri);

  fastify.decorate("db", db).addHook("onClose", async (instance, done) => {
    await db.$pool.end();
    done();
  });

  const migrationResult = await runMigration();

  if (migrationResult.length > 0) {
    fastify.log.info({
      migrationCount: migrationResult.length,
      msg: "Successful migrations run",
    });
  }
});
