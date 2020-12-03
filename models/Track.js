const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: [true, "Поле title обязательно для заполнения"],
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: "Album",
        required: [true, "Поле album обязательно для заполнения"],
    },
    duration: String,
    number: {
        type: String,
        required: [true, "Поле number обязательно для заполнения"],
    },
    published: {
        type: Boolean,
        required: true,
        default: "false",
        enum: ["false", "true"]
    }
});

const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;