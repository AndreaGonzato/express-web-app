const express = require("express");
const { getDb } = require("./db.js");
const dbCollections = require('./database/collections.js');


const router = express.Router();

const db = require("./db.js");

// register a new user
router.post("/auth/signup", async (req, res) => {
    const mongo = db.getDb();
    const user = req.body;
    const last = await mongo.collection(dbCollections.USERS).findOne({}, {sort: {"id": -1}});
    let lastID = last?.id === undefined ? 0 : last.id;
    lastID++;
    user.id = lastID;
    console.log(user); // TODO remove this log
    await mongo.collection(dbCollections.USERS).insertOne(user);
    res.json(user);
});


// TODO POST /api/auth/signin Login of a user 

// API 3 : OK
// show info of user with this id
router.get("/social/users/:id", async (req, res) => {
    const mongo = db.getDb();
    const id = parseInt(req.params.id);
    let user = await mongo.collection(dbCollections.USERS).findOne({'id' : id});
    res.json(user);
});


// API 4 : OK
// list all the tweets of the user with this id
router.get("/social/messages/:userId", async (req, res) => {
    const mongo = db.getDb();
    const user_id = parseInt(req.params.userId);
    let tweets = await mongo.collection(dbCollections.TWEETS).find({author : user_id}).toArray();
    res.json(tweets);
});


// API 5 : OK
// a singular tweet (idMsg) of the user (userID)
router.get("/social/messages/:userId/:idMsg", async (req, res) => {
    const mongo = db.getDb();
    const user_id = parseInt(req.params.userId);
    const message_id = parseInt(req.params.idMsg);

    let tweet = await mongo.collection(dbCollections.TWEETS).findOne({id : message_id, author: user_id});
    res.json(tweet);
});


// API 6 : REDO AFTER AUTHENTICATION
// PROBLEM : who is the user that post the message? For the moment in a demo version the user is me (id == 1)
// create a new tweet
router.post("/social/messages", async (req, res) => {
    const mongo = getDb();
    const message_text = req.body.text;

    // TODO determine the user ID of the authenticated user
    const user_id = 1;

    /* something like this from lecture
    const user = await mongo.collection("users").findOne({username});
    if( user?.username === username && user?.password == password){
        // correct credential -> so user is authenticated, now i need to authorize him
        // use here JWT 
    }
    */


    const last_obj = await mongo.collection(dbCollections.TWEETS).findOne({}, {sort: {"id": -1}});
    let lastID = last_obj?.id === undefined ? 0 : last_obj.id;
    lastID++;

    const document = {
        id: lastID,
        author: user_id,
        text: message_text,
        created_at: new Date()
    };
    
    const collection = mongo.collection(db.TWEETS_COLLECTION_NAME);

    await collection.insertOne(document);

    res.json(message_text);


});




function lastId(collectionName){
    let last = -99;
    return last;
}







/*


router.get("/social/users", async (req, res) => {
    const mongo = db.getDb();
    let users = await mongo.collection(db.USERS_COLLECTION_NAME).find().toArray();
    res.json(users);
});

*/




/*

router.get("/books/:id", async (req, res) => {
    const mongo = db.getDb();
    const id = parseInt(req.params.id);
    let book = await mongo.collection("books").findOne({'id' : id});
    res.json(book);

});


router.put("/books/:id", async (req, res) => {
    const mongo = db.getDb();
    const book = req.body;
    const id = parseInt(req.params.id);
    await mongo.collection("books").updateOne({"id" : id}, book);
    res.send(book);
});

router.delete("/books/:id", async (req, res) => {
    const mongo = db.getDb();
    const id = parseInt(req.params.id);
    // find the element (just to return something in this function)
    const book = await mongo.collection("books").findOne({'id' : id});
    // remove the element
    await mongo.collection("books").deleteOne({"id": id});
    res.send(book); 
}); 


router.delete("/books/", async (req, res) => {
    const mongo = db.getDb();
    await mongo.collection("books").deleteMany({});
    res.send({});
}); 

router.post("/login", async (req, res) => {
    const mongo = getDb();
    const {username, password} = req.body;
    const user = await mongo.collection("users").findOne({username});
    if( user?.username === username && user?.password == password){
        // correct credential -> so user is authenticated, now i need to authorize him
  
        // use here JWT 
    }
});

*/

module.exports = router;