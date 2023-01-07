const express = require("express");

const db = require("./database/db.js");
const dbManager = require("./database/db-manager.js");
const dbCollections = require('./database/collections.js');


// JWT
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); // to access .env file to load a secret password
// get config vars
dotenv.config();
// access config var
const JWT_SECRET = process.env.TOKEN_SECRET; 


function generateToken(tokenContent) {    
    return jwt.sign(tokenContent, JWT_SECRET, { expiresIn: '1d' });
}


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null){
        res.status(401).send("Unauthorized");
    }
  
    jwt.verify(token, JWT_SECRET, (err, authData) => {
  
        if (err){
            console.error(err);
            res.sendStatus(403);
        }
        
        // save the user data in the req obj
        req.user = authData;
        next(); 
    })
}



const router = express.Router();


// TODO remove this, it is just an example
router.get('/protected', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    res.json({message: "you are in a protected part of the site", userId : userId})
});

// TODO remove this get
router.get('/test', (req, res) => {
    res.json({message: "server is working"});
    console.log("I'm still alive");
});


// API 1 : 
// register a new user
router.post("/auth/signup", async (req, res) => {
    const mongo = db.getDb();
    const user = req.body;

    const nextUserID = await dbManager.getNextId(dbCollections.USERS);
    user.id = nextUserID;

    // check that the username is unique

    await mongo.collection(dbCollections.USERS).insertOne(user);
    res.json(user);
});



// API 2 : OK
// login of a user 
// when a user sign in I give him a JWT token
router.post("/auth/signin", async (req, res) => {
    const mongo = db.getDb();    

    const postedUser = { email, password } = req.body;

    // TODO check that it dos not inject code with user and password

    const user = await mongo.collection(dbCollections.USERS).findOne(postedUser);

    if(!user){
        // User not found: (email + password) does not match
        res.status(400).send({ message: 'User not found' });
    }else{
        const token = generateToken({id : user.id});
        res.send(token);
    }
});



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


// API 6 : OK
// create a new tweet
// input: {"text": "a new Tweet"}
router.post("/social/messages", authenticateToken, async (req, res) => {
    const mongo = db.getDb();
    const messageText = req.body.text;

    const userID = req.user.id;

    const nextTweetID = await dbManager.getNextId(dbCollections.TWEETS);

    const tweet = {
        id: nextTweetID,
        author: userID,
        text: messageText,
        created_at: new Date()
    };
    
    const collection = mongo.collection(dbCollections.TWEETS);

    await collection.insertOne(tweet);

    res.json(tweet);

});

// API 7 : OK
// list all the followers of a user with a given id
router.get("/social/followers/:id", async (req, res) => {
    const mongo = db.getDb();
    const userID = parseInt(req.params.id);

    // e.g. : the following query will find the follower of the user with id equal to 1
    // db.users.find({following : { $in : [1] }})
    const query = {following : {$in : [userID] }};
    const users = await mongo.collection(dbCollections.USERS).find(query).toArray();

    res.json(users);
});


// API 8 : REDO AFTER AUTHENTICATION
// add a new follow to the user with the given id 
// Aggiunta di un nuovo follow per l’utente id
// PROBLEM: whom I'am? I need to add a following to the current authenticated user 
router.post("/social/followers/:id", async (req, res) => {
    const mongo = db.getDb();
    const userIDThatHasNewFollower = parseInt(req.params.id);

    const response = {
        val: "this API is not implemented yet"
    }

    res.json(tweet);

});


// API 9 : DO AFTER AUTHENTICATION
// DELETE /api/social/followers/:id Rimozione del follow all’utente id

// API 10 : OK
// list all the messages of the following users
router.get("/social/feed", authenticateToken, async (req, res) => {
    const mongo = db.getDb();
    const userId = req.user.id;
    const user = await mongo.collection(dbCollections.USERS).findOne({id : userId});

    const following = user.following;
    let output = {messages: []};

    for (let i = 0; i < following.length; i++) {
        const messagesOfFollowingUserI = await mongo.collection(dbCollections.TWEETS).find({author: following[i]}).toArray();
        
        messagesOfFollowingUserI.forEach(message => {
            output.messages.push(message)
        });
        
    }
    
    // TODO the output is not chronological ordered 

    res.json(output);
});


// API 11 : DO AFTER AUTHENTICATION
// POST /api/social/like/:idMessage Like ad un messaggio con ID idMessage

// API 12 : DO AFTER AUTHENTICATION
// DELETE /api/social/like/:idMessage Rimozione like al messaggio con ID idMessage


// API 13 : OK
// GET /api/social/search?q=query
// Remember that JSON format use double quotes for the attribute definition. e.g. {"id" : 1}
// find the user that match the query string
router.get("/social/search", async (req, res) => {
    const mongo = db.getDb();
    const queryString = req.query.q;
    const queryObj = JSON.parse(queryString);

    const users = await mongo.collection(dbCollections.USERS).find(queryObj).toArray();

    res.json(users);
});


// API 14 : OK
// if the user is authenticated return the user info
router.get("/social/whoami", authenticateToken, async (req, res) => {
    const mongo = db.getDb();

    const userId = req.user.id;

    const user = await mongo.collection(dbCollections.USERS).findOne({id : userId});

    res.json(user);
});










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