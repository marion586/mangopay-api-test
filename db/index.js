const { MongoClient } = require("mongodb");
const requireDir = require("require-directory");
const Promise = require("bluebird");
const { mongodb } = require("../config");

const modelFactories = requireDir(module, "../models");

module.exports = Promise.try(async () => {
  const client = await MongoClient.connect(mongodb.url, mongodb.options);
  console.log(mongodb)
  const db = client.db(mongodb.databaseName);

  const models = {};

  // Load and initialize models
  Object.entries(modelFactories).forEach(([name, factory]) => {
    console.log(factory)
    models[name] = factory({ db });
  });
  console.log(models)
  return { client, db, models };
});
