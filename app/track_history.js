const router = require("express").Router();
const TrackHistory = require("../models/TrackHistory");
const Track = require("../models/Track");
const User = require("../models/User");
const auth = require("../middleware/auth");


router.get("/", auth, async (req, res) => {
    try {
        const history = await TrackHistory.find({user: req.user._id}).sort({datetime: -1}).populate({
            path: "track",
            populate: ({path:"album", populate: "artist"})
        });

        res.send(history)
    } catch (e) {
        res.status(422).send(e);
    }
});


router.post("/", auth, async (req, res) => {
    const token = req.get('Authorization');
    const userToken = await User.findOne({token});

    const trackHistoryData = req.body;
    trackHistoryData.datetime = new Date();
    trackHistoryData.user = userToken._id;

    const track = await Track.findById(req.body.track);

    if (!track) return res.status(400).send("Track does not exists");
    const trackHistory = new TrackHistory(trackHistoryData);

    try {
        await trackHistory.save();
        res.send(trackHistory);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;