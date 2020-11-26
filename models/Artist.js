const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    description: String,
    published: {
        type: Boolean,
        required: true,
        default: "false",
        enum: ["false", "true"]
    }
});

const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;