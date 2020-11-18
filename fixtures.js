const mongoose = require("mongoose");
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require('./models/User');
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");
const TrackHistory = require("./models/TrackHistory");

mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("artists");
        await db.dropCollection("albums");
        await db.dropCollection("users");
        await db.dropCollection("trackhistories");
        await db.dropCollection("tracks");
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [powfu, billieEilish] = await Artist.create({
        name: "Powfu",
        description: "Isaiah Faber (born March 31, 1999), " +
            "known professionally as Powfu, is a Canadian rapper, singer and songwriter. " +
            "He amassed popularity following the release of his first charting single, \"" +
            "Death Bed (Coffee for Your Head)\", which peaked at #23 on the Billboard Hot 100.",
        image: "powfu.jpg"
    }, {
        name: "Billie Eilish",
        description: "Billie Eilish Pirate Baird O'Connell " +
            "(born December 18, 2001) is an American singer-songwriter. " +
            "She first gained attention in 2015 when she uploaded the song \"Ocean Eyes\" to SoundCloud, " +
            "which was subsequently released by the Interscope Records subsidiary Darkroom",
        image: "billie.webp"
    });

    const [
        poemsOfThePast,
        someBoringLoveStories,
        dontSmileAtMe,
        liveAtThirdManRecords
    ] = await Album.create({
        title: "Poems of the past",
        artist: powfu._id,
        image: "poemsofthepast.jpeg",
        year_of_issue: "2007"
    }, {
        title: "Some Boring, Love Stories",
        artist: powfu._id,
        image: "lovestories.jpg",
        year_of_issue: "2006"
    }, {
        title: "Live at Third Man Records",
        artist: billieEilish._id,
        image: "billie1.png",
        year_of_issue: "2019"
    }, {
        title: "Dont Smile at Me",
        artist: billieEilish._id,
        image: "dontsmile.jpeg",
        year_of_issue: "2020"
    });
    const [
        theStoryOfThePaperBoy,
        illComeBackToYou,
        deathBedCoffeeForYourHead,
        lifeIsChanging,
        imUsedToIt,
        bellyache,
        allTheGoodGirlsGoToHell,
        iLoveYou
    ] = await Track.create({
        title: "The Story of the Paper Boy",
        album: poemsOfThePast._id,
        duration: "02:20",
        number: "1"
    },{
        title: "ill come back to you",
        album: poemsOfThePast._id,
        duration: "02:15",
        number: "2"
    }, {
        title: "death bed (coffee for your head)",
        album: someBoringLoveStories._id,
        duration: "02:24",
        number: "1"
    }, {
        title: "Life Is Changing",
        album: someBoringLoveStories._id,
        duration: "03:05",
        number: "2"
    }, {
        title: "im used to it",
        album: dontSmileAtMe._id,
        duration: "03:10",
        number: "1"
    },{
        title: "bellyache",
        album: dontSmileAtMe._id,
        duration: "03:10",
        number: "2"
    }, {
        title: "All the Good Girls Go to Hell",
        album: liveAtThirdManRecords._id,
        duration: "03:20",
        number: "1"
    }, {
        title: "I Love You",
        album: liveAtThirdManRecords._id,
        duration: "02:40",
        number: "2"
    });
    const [user, admin] = await User.create({
        username: "user",
        email: "user@shop.com",
        password: "12345678Kk",
        token: nanoid()
    }, {
        username: "admin",
        email: "admin@shop.com",
        password: "12345678Kk",
        token: nanoid()
    });
    await TrackHistory.create({
        track: theStoryOfThePaperBoy._id,
        datetime: "Mon Nov 16 2020 18:16:54 GMT+0600 (Kyrgyzstan Time)",
        user: user._id,
    }, {
        track: illComeBackToYou._id,
        datetime: "Mon Nov 16 2020 18:16:55 GMT+0600 (Kyrgyzstan Time)",
        user: admin._id,
    }, {
        track: deathBedCoffeeForYourHead._id,
        datetime: "Mon Nov 16 2020 18:16:59 GMT+0600 (Kyrgyzstan Time)",
        user: user._id,
    }, {
        track: lifeIsChanging._id,
        datetime: "Mon Nov 16 2020 18:17:55 GMT+0600 (Kyrgyzstan Time)",
        user: admin._id,
    }, {
        track: imUsedToIt._id,
        datetime: "Mon Nov 15 2020 18:16:59 GMT+0600 (Kyrgyzstan Time)",
        user: user._id,
    }, {
        track: bellyache._id,
        datetime: "Mon Nov 17 2020 18:17:55 GMT+0600 (Kyrgyzstan Time)",
        user: admin._id,
    }, {
        track: allTheGoodGirlsGoToHell._id,
        datetime: "Mon Nov 18 2020 18:16:59 GMT+0600 (Kyrgyzstan Time)",
        user: user._id,
    }, {
        track: iLoveYou._id,
        datetime: "Mon Nov 18 2020 18:17:55 GMT+0600 (Kyrgyzstan Time)",
        user: admin._id,
    });

    db.close();
});