const router = require("express").Router();
const Track = require("../models/Track");
const Album = require("../models/Album");

const createRouter = () => {
  router.get('/', async (req, res) => {
    let query;
    let albumIds = [];
    let trackQuery;

    if(req.query.album) {
      albumIds.push(req.query.album);
      trackQuery = { album: { $in: albumIds }};
    }

    try {
      if(req.query.artist) {
        query = {artist: req.query.artist};
        const albums = await Album.find(query);

        albums.map(function(num) {
          return albumIds.push(num._id);
        });

        trackQuery = { album: { $in: albumIds }};
      }

      const tracks = await Track.find(trackQuery).populate({
        path: "album",
        populate: "artist",
      });

      res.send(tracks);
    } catch (e) {
      res.send(e);
    }
  });




  router.post("/", async (req, res) => {
    const trackData = req.body;

    const album = await Album.findById(req.body.album);

    if(!album) return res.status(400).send("Album does not exists");
    const track = new Track(trackData);
    try{
      await track.save();
      res.send(track);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  return router;
};

module.exports = createRouter;