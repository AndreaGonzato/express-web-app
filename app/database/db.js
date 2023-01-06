/*
const { MongoClient } = require("mongodb");

const url = "mongodb://mongohost";

const client = new MongoClient(url);

let _db;

let databaseToExport = {
  connect: async () => {
    await client.connect();
    _db = client.db("expressDB");
  },
  getDb: () => _db
};

module.exports = databaseToExport;
// TODO when return is better to check if the db is still connected

*/