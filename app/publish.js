const router = require("express").Router();
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const Track = require("../models/Track");

router.get('/albums', async (req, res) => {
    try {
        const albums = await Album.find().populate("artist")
        res.send(albums);
    } catch(e) {
        res.send(500);
    }
});

router.get('/artists', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch {
        res.sendStatus(500);
    }
});
router.get('/tracks', async (req, res) => {
    try {
        const tracks = await Track.find().populate({
            path: "album",
            populate: ("artist")
        });
        res.send(tracks);
    } catch {
        res.sendStatus(500);
    }
});




module.exports = router;