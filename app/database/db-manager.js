const db = require("./db.js");


async function getNextId(collectionName){
    const mongo = db.getDb();
    const last_obj = await mongo.collection(collectionName).findOne({}, {sort: {"id": -1}});

    let nextID = last_obj?.id === undefined ? 0 : last_obj.id;
    nextID++;
    return nextID
}

module.exports.getNextId = getNextId;