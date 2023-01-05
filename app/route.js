const express = require("express");
const { getDb } = require("./db.js");


const router = express.Router();

const db = require("./db.js");

// register a new user
router.post("/auth/signup", async (req, res) => {
    const mongo = db.getDb();
    const user = req.body;
    const last = await mongo.collection(db.USERS_COLLECTION_NAME).findOne({}, {sort: {"id": -1}});
    let lastID = last?.id === undefined ? 0 : last.id;
    lastID++;
    user.id = lastID;
    console.log(user); // TODO remove this log
    await mongo.collection(db.USERS_COLLECTION_NAME).insertOne(user);
    res.json(user);
});


// TODO POST /api/auth/signin Login of a user 


// show info of user with this id
router.get("/social/users/:id", async (req, res) => {
    const mongo = db.getDb();
    const id = parseInt(req.params.id);
    let user = await mongo.collection(db.USERS_COLLECTION_NAME).findOne({'id' : id});
    res.json(user);
});





/*


router.get("/social/users", async (req, res) => {
    const mongo = db.getDb();
    let users = await mongo.collection(db.USERS_COLLECTION_NAME).findO().toArray();
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