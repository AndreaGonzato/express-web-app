const express = require("express");
const app = express();

const db = require("./database/db.js");

const API_router = require("./route.js");

app.use(express.static("public"));
app.use(express.json());
app.use("/api", API_router);


const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`server is listening on http://0.0.0.0:${PORT} `);
    await db.connect();
    console.log("MongDB is connected");
});
