const dbCollections = {
    USERS : "users",
    TWEETS : "tweets"
};


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


