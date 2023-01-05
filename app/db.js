const { MongoClient } = require("mongodb");

const url = "mongodb://mongohost";

const client = new MongoClient(url);

let _db;

let databaseToExport = {
  connect: async () => {
    await client.connect();
    _db = client.db("expressDB");
  },
  getDb: () => _db,
  USERS_COLLECTION_NAME: "users",
  TWEETS_COLLECTION_NAME: "tweets"

};

Object.defineProperty(databaseToExport, 'USERS_COLLECTION_NAME', {
    value: 'users',
    writable: false
  });

  Object.defineProperty(databaseToExport, 'TWEETS_COLLECTION_NAME', {
    value: 'tweets',
    writable: false
  });
  
  


module.exports = databaseToExport;
// TODO when return is better to check if the db is still connected
