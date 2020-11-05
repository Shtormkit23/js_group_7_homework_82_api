const router = require("express").Router();
const TrackHistory = require("../models/TrackHistory");
const Track = require("../models/Track");
const User = require("../models/User");


router.post("/", async (req, res) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }
    const userToken = await User.findOne({token});
    if (!userToken) {
        return res.status(401).send({error: 'Wrong token!'});
    }

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