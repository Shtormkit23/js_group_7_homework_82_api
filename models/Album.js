const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: true
    },
    year_of_issue: {
        type: Date,
        required: true
    },
    image: String,
    published: {
        type: Boolean,
        required: true,
        default: false,
        enum: [false, true]
    }
});

AlbumSchema.plugin(idValidator, {
    message: "Указанного альбома не существует"
});
const Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;