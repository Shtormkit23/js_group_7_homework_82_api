const router = require("express").Router();
const Track = require("../models/Track");
const Album = require("../models/Album");

router.get('/', async (req, res) => {
    try {
        let query = {published: true};

        if (req.query.album) {
            query.album = req.query.album
        }
        const tracks = await Track.find(query).populate({
            path: "album",
            populate: ("artist")
        });
        res.send(tracks);
    } catch {
        res.sendStatus(500);
    }
});


router.post("/", async (req, res) => {
    const trackData = req.body;
    const album = await Album.findById(req.body.album);

    if (!album) return res.status(400).send("Album does not exists");
    const track = new Track(trackData);
    try {
        await track.save();
        res.send(track);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;