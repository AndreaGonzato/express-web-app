const express = require("express");

const db = require("./database/db.js");
const dbManager = require("./database/db-manager.js");
const dbCollections = require("./database/collections.js");

// JWT
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); // to access .env file to load a secret password
// get config vars
dotenv.config();
// access config var
const JWT_SECRET = process.env.TOKEN_SECRET;

function generateToken(tokenContent) {
  return jwt.sign(tokenContent, JWT_SECRET, { expiresIn: "1d" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, JWT_SECRET, (err, authData) => {
    if (err) {
      console.error(err);
      return res.sendStatus(403);
    }

    // save the user data in the req obj
    req.user = authData;
    next();
  });
}

const router = express.Router();

// TODO can i restrict and make more secure my access policy?
//this permit to get a fetch from all the domain and port
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// TODO GENERAL check that it dos not inject code in the api (attention to all the POST requests)

// TODO remove this, it is just an example to verify that an user is authenticated
router.get("/protected", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  res.json({
    message: "you are in a protected part of the site",
    userId: userId,
  });
});

// TODO remove this get, it is just a test to see if the server is still alive
router.get("/test", (req, res) => {
  console.log("Server is still alive");
  res.json({ message: "server is still alive working" });
});

// API 1 : OK
// register a new user
// input e.g. {"username": "uniqueUsername", "email":"someemail@gmail.com", "password":"pass", "name":"Matt", "surname":"Taylor", "bio":"my bio"}
router.post("/auth/signup", async (req, res) => {
  const mongo = db.getDb();
  const user = req.body;

  const nextUserID = await dbManager.getNextId(dbCollections.USERS);
  user.id = nextUserID;

  if (
    user.username === undefined ||
    user.email === undefined ||
    user.password === undefined ||
    user.name === undefined ||
    user.surname === undefined ||
    user.bio === undefined ||
    user.username === "" ||
    user.email === "" ||
    user.password === "" ||
    user.name === "" ||
    user.surname === "" ||
    user.bio === ""
  ) {
    return res
      .status(500)
      .send({
        message:
          "You need to specify all the fields of a user: (username, email, password, name, surname, bio)",
      });
  }

  // check that the username is unique
  const userWithSameUsername = await mongo
    .collection(dbCollections.USERS)
    .findOne({ username: user.username });

  if (userWithSameUsername) {
    // it already exist an user with that username
    return res
      .status(500)
      .send({
        message:
          "The username: " +
          userWithSameUsername.username +
          " already exist, choose another one!",
      });
  }

  const result = await mongo.collection(dbCollections.USERS).insertOne(user);
  res.json(result);
});

// API 2 : OK
// login of a user
// when a user sign in I give him a JWT token
// e.g of an input: {"email" : "myEmail@gmail.com", "password" : "myPassword"}
router.post("/auth/signin", async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const mongo = db.getDb();

  const postedUser = ({ email, password } = req.body);

  const user = await mongo.collection(dbCollections.USERS).findOne(postedUser);

  if (!user) {
    // User not found: (email + password) does not match
    res.status(400).send({ message: "User not found" });
  } else {
    const token = generateToken({ id: user.id });
    res.send({ token });
  }
});

// API 3 : OK
// show info of user with this id
router.get("/social/users/:id", async (req, res) => {
  const mongo = db.getDb();
  const id = parseInt(req.params.id);
  let user = await mongo.collection(dbCollections.USERS).findOne({ id: id });
  res.json(user);
});

// API 4 : OK
// list all the tweets of the user with this id
router.get("/social/messages/:userId", async (req, res) => {
  const mongo = db.getDb();
  const user_id = parseInt(req.params.userId);
  let tweets = await mongo
    .collection(dbCollections.TWEETS)
    .find({ author: user_id })
    .toArray();
  res.json(tweets);
});

// API 5 : OK
// a singular tweet (idMsg) of the user (userID)
router.get("/social/messages/:userId/:idMsg", async (req, res) => {
  const mongo = db.getDb();
  const user_id = parseInt(req.params.userId);
  const message_id = parseInt(req.params.idMsg);

  let tweet = await mongo
    .collection(dbCollections.TWEETS)
    .findOne({ id: message_id, author: user_id });
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
    created_at: new Date(),
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
  const query = { following: { $in: [userID] } };
  const users = await mongo
    .collection(dbCollections.USERS)
    .find(query)
    .toArray();

  res.json(users);
});

// API 8 : OK
// add a new follow to the user with the given id
// require authentication to determine the user who decide to add a now following user increase his feed tweets
router.post("/social/followers/:id", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const userIDThatHasNewFollower = parseInt(req.params.id);

  const mongo = db.getDb();

  const user = await mongo
    .collection(dbCollections.USERS)
    .findOne({ id: userId });
  const list = user.following;
  if (list.includes(userIDThatHasNewFollower)) {
    // the user with userId was already following him (userIDThatHasNewFollower)
    return res.send({
      message: "you already following user: " + userIDThatHasNewFollower,
    });
  } else {
    const userThatHasNewFollower = await mongo
      .collection(dbCollections.USERS)
      .findOne({ id: userIDThatHasNewFollower });

    if (!userThatHasNewFollower) {
      // this user does not exist in the db
      return res.status(500).send({
        message:
          "does not exist an user with a id: " + userIDThatHasNewFollower,
      });
    }

    // here I'm sure that the use with id userIDThatHasNewFollower exist
    const result = await mongo
      .collection(dbCollections.USERS)
      .updateOne(
        { id: userId },
        { $push: { following: userIDThatHasNewFollower } }
      );

    res.json(result);
  }
});

// API 9 : OK
// remove a following user with a given id
// require authentication to determine the user who decide to not follow anymore another user
router.delete("/social/followers/:id", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const userIdToRemoveFollow = parseInt(req.params.id);

  const mongo = db.getDb();

  const result = await mongo
    .collection(dbCollections.USERS)
    .updateOne({ id: userId }, { $pull: { following: userIdToRemoveFollow } });

  res.send({ result });
});

// API 10 : OK
// list all the messages of the following users
router.get("/social/feed", authenticateToken, async (req, res) => {
  const mongo = db.getDb();
  const userId = req.user.id;
  const user = await mongo
    .collection(dbCollections.USERS)
    .findOne({ id: userId });

  const following = user.following;
  let output = { messages: [] };

  for (let i = 0; i < following.length; i++) {
    const userI = await mongo.collection(dbCollections.USERS).findOne({id: following[i]});

    const messagesOfFollowingUserI = await mongo
      .collection(dbCollections.TWEETS)
      .find({ author: following[i] })
      .toArray();
    
    
    messagesOfFollowingUserI.forEach((message) => {
      message.author_username = userI.username;
      output.messages.push(message);
    });
  }

  // sort by the field created_at
  output.messages.sort(function (a, b) {
    let dateA = new Date(a.created_at);
    let dateB = new Date(b.created_at);
    return dateB - dateA;
  });

  res.json(output);
});

// API 11 : OK
// like to an message with a given ID
// require authentication to determine the user who is putting the like
router.post("/social/like/:idMessage", authenticateToken, async (req, res) => {
  const userID = req.user.id;
  const messageID = parseInt(req.params.idMessage);

  const mongo = db.getDb();

  //e.g. this query add a like to the message with id 20 by the user with id 1
  //db.tweets.updateOne({id:20}, {$push: {likes: 1}});

  let message = await mongo
    .collection(dbCollections.TWEETS)
    .findOne({ id: messageID });

  if (!message) {
    // we don't have a message -> there is no message with this id
    return res.status(500).send({
      message: "It dos not exist a message with this id: " + messageID,
    });
  }

  let list = message.likes;
  if (list !== undefined && list.includes(userID)) {
    // the user with userID has already put a like to this message previously
    return res.send({
      message: "you already put a like to this message previously",
    });
  } else {
    // add a like to the message
    const result = await mongo
      .collection(dbCollections.TWEETS)
      .updateOne({ id: messageID }, { $push: { likes: userID } });
    res.send({ result });
  }
});

// API 12 : OK
// delete a like to the message with a given id
// require authentication to determine the user who remove the like
router.delete(
  "/social/like/:idMessage",
  authenticateToken,
  async (req, res) => {
    const userId = req.user.id;
    const messageID = parseInt(req.params.idMessage);

    const mongo = db.getDb();

    // e.g. the following query remove the like of the user with id 1 to the message with id 20 (if has this like)
    // db.tweets.updateOne({id:20}, {$pull: {likes: 1}});
    const result = await mongo
      .collection(dbCollections.TWEETS)
      .updateOne({ id: messageID }, { $pull: { likes: userId } });

    res.send({ result });
  }
);

// API 13 : OK
// find the user that match the query string
// Remember that JSON format use double quotes for the attribute definition. e.g. of an http req: /api/social/search?q={"id" : 1}
// GET /api/social/search?q=query
router.get("/social/search", async (req, res) => {
  const mongo = db.getDb();
  const queryString = req.query.q;
  const queryObj = JSON.parse(queryString);

  const users = await mongo
    .collection(dbCollections.USERS)
    .find(queryObj)
    .toArray();

  res.json(users);
});

// API 14 : OK
// if the user is authenticated return the user info
router.get("/social/whoami", authenticateToken, async (req, res) => {
  const mongo = db.getDb();

  const userId = req.user.id;

  const user = await mongo
    .collection(dbCollections.USERS)
    .findOne({ id: userId });

  res.json(user);
});

module.exports = router;
