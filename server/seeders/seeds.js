const userSeeds = require('./userSeed.json');
const songSeeds = require('./songSeed.json');
const db = require('../config/connection');
const { Song, User } = require('../models');

db.once('open', async () => {
    try {
      await Song.deleteMany({});
      await User.deleteMany({});
      
      await User.create(userSeeds);
      await Song.create(songSeeds);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('completed successfully');
    process.exit(0);
})