const dbCollections = {
    USERS : "users",
    TWEETS : "tweets"
};

/*
const users = {
    id: "id",
    username,
    email,
    password,
    name: "name",
    surname,
    bio
}

const tweets = {
    id,
    author,
    text,
    likes,
    created_at
}
*/

// this do not permit to change the the attribute USERS of the Collections
Object.defineProperty(dbCollections, "USERS", {
    value: "users",
    writable: false,
});


// this do not permit to change the the attribute TWEETS of Collection
Object.defineProperty(dbCollections, "TWEETS", {
    value: "tweets",
    writable: false,
});


module.exports = dbCollections;
//module.exports.users = users;
//module.exports.tweets = tweets;


