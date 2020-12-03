const express = require("express");
const artists = require("./app/artists");
const albums = require("./app/albums");
const tracks = require("./app/tracks");
const track_history = require("./app/track_history");
const users = require("./app/users");
const publish = require("./app/publish");
const deletion = require("./app/deletion");
const config = require("./config");

const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 8001;


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const run = async () => {
    await mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true, autoIndex: true});

    app.use("/artists", artists);
    app.use("/albums", albums);
    app.use("/tracks", tracks);
    app.use("/track_history", track_history);
    app.use("/users", users);
    app.use("/publish", publish);
    app.use("/deletion", deletion);

    console.log("Connected to mongoDB");

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.log);
