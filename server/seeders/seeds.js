const userSeeds = require('./userSeed.json');
const songSeeds = require('./songSeed.json');
const playlistSeeds = require('./playlistSeed.json');
const db = require('../config/connection');
const { Song, User, Playlist } = require('../models');

db.once('open', async () => {
    try {
      await Song.deleteMany({});
      await User.deleteMany({});
      await Playlist.deleteMany({});
      
      await User.create(userSeeds);
      await Song.create(songSeeds);
      await Playlist.create(playlistSeeds)
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('completed successfully');
    process.exit(0);
})