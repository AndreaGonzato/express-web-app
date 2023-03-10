import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["expressDB"] # TODO change to expressDB
mycol1 = mydb["users"]
mycol1.drop() # to remove all the previous data
mycol2 = mydb["tweets"]
mycol2.drop() # to remove all the previous data


users = [
{
    "id" : 1,
    "username": "gonz",
    "email" : "gonzatoandrea98@gmail.com",
    "password" : "myPassword",
    "name": "Andrea",
    "surname": "Gonzato",
    "bio": "this is a bio"
},

{ "id": 2, "username": "jane", "email": "jane.doe@gmail.com", "password": "mySecretPassword123", "name": "Jane", "surname": "Doe", "bio": "I love hiking and reading books." },
{ "id": 3, "username": "john", "email": "john.smith@gmail.com", "password": "smith123", "name": "John", "surname": "Smith", "bio": "I am a software developer and love building new things." },
{ "id": 4, "username": "sarah", "email": "sarah.johnson@gmail.com", "password": "sarah555", "name": "Sarah", "surname": "Johnson", "bio": "I am a graphic designer and love creating beautiful designs." },
{ "id": 5, "username": "mike", "email": "mike.taylor@gmail.com", "password": "mike12345", "name": "Mike", "surname": "Taylor", "bio": "I am a data scientist and love working with data." },
{ "id": 6, "username": "katie", "email": "katie.brown@gmail.com", "password": "myPassword1!", "name": "Katie", "surname": "Brown", "bio": "I am a journalist and love writing and reporting on current events." },
{ "id": 7, "username": "dave", "email": "dave.williams@gmail.com", "password": "dave123", "name": "Dave", "surname": "Williams", "bio": "I am a musician and love playing and composing music." },
{ "id": 8, "username": "emma", "email": "emma.davis@gmail.com", "password": "emma123", "name": "Emma", "surname": "Davis", "bio": "I am a teacher and love helping others learn new things." },
{ "id": 9, "username": "sam", "email": "sam.johnson@gmail.com", "password": "sam123", "name": "Sam", "surname": "Johnson", "bio": "I am a marketer and love developing and implementing marketing strategies." },
{ "id": 10, "username": "chris", "email": "chris.taylor@gmail.com", "password": "chris123pass", "name": "Chris", "surname": "Taylor", "bio": "I am a financial analyst and love analyzing data to make informed decisions." },
{   
    "id" : 11,
    "username": "mat",
    "email" : "mattiadeg@gmail.com",
    "password" : "pass",
    "name": "Mattia",
    "surname": "Deganutti",
    "bio": "this a very short bio"
},
{
    "id" : 12,
    "username": "ebe",
    "email" : "ebe@gmail.com",
    "password" : "somPass",
    "name": "Ebe",
    "surname": "Visintin",
    "bio": "this a very deep bio"
}
]

x1 = mycol1.insert_many(users)

#print list of the _id values of the inserted documents:
print("inserted ", len(x1.inserted_ids), " users");



tweets = [
{
    "id"  : 1,
    "author" : 1,    
    "text" : "I love web development!",    
    "likes" : [12, 10, 8 , 5],
    "created_at": ("2023-01-06T09:00:00.000Z")
},
{
    "id"  : 2,
    "author" : 2,
    "text" : "JavaScript is my favorite programming language.",
    "likes" : [9, 6, 7 , 4],
    "created_at": ("2023-01-01T10:00:00.000Z")
},
{
    "id"  : 3,
    "author" : 3,
    "text" : "I'm learning about databases in my computer science class.",
    "likes" : [11, 8, 6 , 7],
    "created_at": ("2023-01-01T11:00:00.000Z")
},
{
    "id"  : 4,
    "author" : 4,
    "text" : "I'm building a web app using Node.js and Express.",
    "likes" : [12, 9, 7 , 5],
    "created_at": ("2023-01-01T12:00:00.000Z")
},
{
    "id"  : 5,
    "author" : 5,
    "text" : "I just deployed my first serverless function on AWS Lambda.",
    "likes" : [10, 8, 2 , 3],
    "created_at": ("2023-01-04T13:00:00.000Z")
},
{
    "id"  : 6,
    "author" : 6,
    "text" : "I'm learning about React and building a front-end for my web app.",
    "likes" : [9, 7, 10 , 4],
    "created_at": ("2023-01-01T14:00:00.000Z")
},
{
    "id"  : 7,
    "author" : 7,
    "text" : "I'm excited to start learning about machine learning and artificial intelligence.",
    "likes" : [8, 6, 4 , 2],
    "created_at": ("2023-01-05T15:00:00.000Z")
},
{
    "id"  : 8,
    "author" : 8,
    "text" : "I'm working on a project to visualize data using D3.js.",
    "likes" : [7, 5, 3 , 1],
    "created_at": ("2023-01-04T16:00:00.000Z")
},
{
    "id"  : 9,
    "author" : 9,
    "text" : "I'm learning about the MERN stack (MongoDB, Express, React, Node.js).",
    "likes" : [6, 4, 2],
    "created_at": ("2023-01-03T17:00:00.000Z")
},
{
    "id"  : 10,
    "author" : 10,
    "text" : "I'm working on a project to classify emails as spam or not spam using machine learning.",
    "likes" : [5, 3, 1 ],
    "created_at": ("2023-01-03T18:00:00.000Z")
},
{    "id"  : 11,
    "author" : 12,    
    "text" : "I'm learning about data modeling and NoSQL databases.",    
    "likes" : [9, 7, 5 , 3],
    "created_at": ("2023-01-06T02:00:00.000Z")
},
{
    "id"  : 12,
    "author" : 1,
    "text" : "I'm using GraphQL to build a more flexible API for my web app.",
    "likes" : [8, 6, 4 , 2],
    "created_at": ("2023-01-06T09:00:00.000Z")
},
{   "id"  : 13,
    "author" : 1,    
    "text" : "I'm learning about microservices and how to build scalable web applications.",    
    "likes" : [7, 5, 3 , 11],
    "created_at": ("2023-01-06T21:00:00.000Z")
},
{
    "id"  : 14,
    "author" : 2,
    "text" : "I'm building a REST API using Node.js and Express.",
    "likes" : [6, 4, 5 ],
    "created_at": ("2023-01-06T22:00:00.000Z")
},
{
    "id"  : 15,
    "author" : 3,
    "text" : "I'm learning about data security and authentication in web development.",
    "likes" : [5, 9, 1 ],
    "created_at": ("2023-01-06T23:00:00.000Z")
},
{
    "id"  : 16,
    "author" : 4,
    "text" : "I'm using AWS to host my web application.",
    "likes" : [12, 2],
    "created_at": ("2023-01-07T00:00:00.000Z")
},
{
    "id"  : 17,
    "author" : 5,
    "text" : "I'm learning about design patterns in software engineering.",
    "likes" : [3, 1, 9],
    "created_at": ("2023-01-07T01:00:00.000Z")
},
{
    "id"  : 18,
    "author" : 6,
    "text" : "I'm learning about software testing and how to write efficient test cases.",
    "likes" : [2, 4],
    "created_at": ("2023-01-07T02:00:00.000Z")
},
{
    "id"  : 19,
    "author" : 7,
    "text" : "I'm learning about agile development methodologies.",
    "likes" : [1, 2, 3, 4, 5, 8, 9, 10],
    "created_at": ("2023-01-07T03:00:00.000Z")
},
{
    "id"  : 20,
    "author" : 8,
    "text" : "I'm learning about cloud computing and how it can benefit businesses.",
    "likes" : [1, 7],
    "created_at": ("2023-01-07T04:00:00.000Z")
}
]


x2 = mycol2.insert_many(tweets)

#print list of the _id values of the inserted documents:
print("inserted ", len(x2.inserted_ids), " tweets");



u1 = mycol1.update_one(
    { "id": 12 },
    { "$set" : { "following" : [1, 2, 7] } }
)
print("updated ", u1.modified_count)



u2 = mycol1.update_one(
   { "id":  11},
   { "$set": { "following": [1, 9, 8] } }
)
print("updated ", u2.modified_count)


u3 = mycol1.update_one(
   { "id":  10},
   { "$set" : { "following" : [3, 5, 6] } }
)
print("updated ", u3.modified_count)


u4 = mycol1.update_one(
   { "id":  9},
   { "$set": { "following": [3, 2, 7] } }
)
print("updated ", u4.modified_count)


u5 = mycol1.update_one(
   { "id": 8 },
   { "$set": { "following": [2, 5, 9] } }
)
print("updated ", u5.modified_count)


u6 = mycol1.update_one(
   { "id": 7 },
   { "$set": { "following" : [2, 5, 9] } }
)
print("updated ", u6.modified_count)


u7 = mycol1.update_one(
   { "id": 6 },
   { "$set": { "following": [3, 2, 8] } }
)
print("updated ", u7.modified_count)


u8 = mycol1.update_one(
   { "id":  4},
   { "$set": { "following": [1] } }
)
print("updated ", u8.modified_count)


u9 = mycol1.update_one(
   { "id": 3 },
   { "$set": { "following": [1, 9, 11, 4] } }
)
print("updated ", u9.modified_count)


u10 = mycol1.update_one(
   { "id": 2 },
   { "$set": { "following": [1, 12, 8] } }
)
print("updated ", u10.modified_count)


u11 = mycol1.update_one(
   { "id": 1 },
   { "$set": { "following": [4, 8, 12, 5] } }
)
print("updated ", u11.modified_count)
