const router = require("express").Router();
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const Track = require("../models/Track");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

router.delete("/albums/:id", [auth, permit('admin')], async (req, res) => {
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

router.delete("/artists/:id", [auth, permit('admin')], async (req, res) => {
    try {
        const albums = await Album.find({artist: req.params.id})
        if (albums.length > 0) {
            return res.status(422).send({message: 'Delete related fields first'});
        }
        await Artist.findOneAndRemove({_id: req.params.id});
        return res.send({ message: `${req.params.id} removed` });
    } catch (e) {
        console.log(e)
        return res.status(422).send(e);
    }
});


router.delete("/tracks/:id", [auth, permit('admin')], async (req, res) => {
    try {
        await Track.findOneAndRemove({_id: req.params.id});
        return res.send({ message: `${req.params.id} removed` });
    } catch (e) {
        return res.status(422).send(e);
    }
});

module.exports = router;