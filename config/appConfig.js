
function loadConfigFromEnv (key) {
  const varEnv = process.env[key]

  if(!varEnv) {
    throw new Error(`mush be have a variable ${key} in env.`)
  }

  return varEnv
}


module.exports = {
  postgresUri: loadConfigFromEnv('POSTGRES_URI')
}