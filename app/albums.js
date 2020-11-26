const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {nanoid} = require("nanoid");
const config = require("../config");
const Album = require("../models/Album");
const Track = require("../models/Track");
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
    let query = {published: true};

    if (req.query.artist) {
        query.artist = req.query.artist
    }

    try {
        const albums = await Album.find(query).populate("artist").sort({year_of_issue: 1});
        res.send(albums);
    } catch(e) {
        res.send(500);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let params = {published: true}
        params.id = req.params.id
        const result = await Album.findById(params).populate("artist");
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(500);
    }
});

router.post("/", upload.single("image"), async (req, res) => {
    const albumData = req.body;

    if (req.file) {
        albumData.image = req.file.filename;
    }

    const album = new Album(albumData);
    try {
        await album.save();
        res.send(album);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put("/:id", [auth, permit('admin')], async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        album.published = !album.published
        await album.save();
        return res.send({ message: `${req.params.id} published` });
    } catch (e) {
        return res.status(422).send(e);
    }
});

router.delete("/:id", [auth, permit('admin')], async (req, res) => {
    try {
        const tracks = await Track.find({album: req.params.id})
        if (tracks.length > 0) {
            return res.status(422).send({message: 'Delete related fields first'});
        }
        await Album.findOneAndRemove({_id: req.params.id});
        return res.send({ message: `${req.params.id} removed` });
    } catch (e) {
        return res.status(422).send(e);
    }
});

module.exports = router;