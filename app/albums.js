const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {nanoid} = require("nanoid");
const config = require("../config");
const Artist = require("../models/Artist");
const Album = require("../models/Album");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

const createRouter = () => {
  router.get('/', async (req, res) => {
    let query;
    if(req.query.artist) {
      query = {artist: req.query.artist}
    }
    try {
      const albums = await Album.find(query).populate("artist");
      res.send(albums);
    } catch {
      res.sendStatus(500);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const result = await Album.findById(req.params.id).populate("artist");

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
    const artist = await Artist.findById(req.body.artist);

    if(!artist) return res.status(400).send("Artist does not exists");
    const album = new Album(albumData);
    try{
      await album.save();
      res.send(album);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  return router;
};

module.exports = createRouter;