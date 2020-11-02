const express = require("express");
const artists = require("./app/artists");
const albums = require("./app/albums");
const tracks = require("./app/tracks");



const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const run = async () => {
    await mongoose.connect("mongodb://localhost/music", {useNewUrlParser: true});

    app.use("/artists", artists());
    app.use("/albums", albums());
    app.use("/tracks", tracks());

    console.log("Connected to mongoDB");

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.log);
