const router = require("express").Router();
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const Track = require("../models/Track");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

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

router.put("/tracks/:id", [auth, permit('admin')], async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        track.published = !track.published
        await track.save();
        return res.send({ message: `${req.params.id} published` });
    } catch (e) {
        return res.status(422).send(e);
    }
});

router.put("/artists/:id", [auth, permit('admin')], async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        artist.published = !artist.published
        await artist.save();
        return res.send({ message: `${req.params.id} published` });
    } catch (e) {
        return res.status(422).send(e);
    }
});

router.put("/albums/:id", [auth, permit('admin')], async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        album.published = !album.published
        await album.save();
        return res.send({ message: `${req.params.id} published` });
    } catch (e) {
        return res.status(422).send(e);
    }
});

module.exports = router;