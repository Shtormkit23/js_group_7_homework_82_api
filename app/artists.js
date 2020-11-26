const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {nanoid} = require("nanoid");
const config = require("../config");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        let published = {published: true}
        const artists = await Artist.find(published);
        res.send(artists);
    } catch {
        res.sendStatus(500);
    }
});

router.post("/", upload.single("image"), async (req, res) => {
    const artistData = req.body;

    if (req.file) {
        artistData.image = req.file.filename;
    }

    const artist = new Artist(artistData);
    try {
        await artist.save();
        res.send(artist);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put("/:id", [auth, permit('admin')], async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        artist.published = !artist.published
        await artist.save();
        return res.send({ message: `${req.params.id} published` });
    } catch (e) {
        return res.status(422).send(e);
    }
});

router.delete("/:id", [auth, permit('admin')], async (req, res) => {
    try {
        const albums = await Album.find({artist: req.params.id})
        if (albums.length > 0) {
            return res.status(422).send({message: 'Delete related fields first'});
        }
        await Artist.findOneAndRemove({_id: req.params.id});
        return res.send({ message: `${req.params.id} removed` });
    } catch (e) {
        return res.status(422).send(e);
    }
});

module.exports = router;