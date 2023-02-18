const { Schema, model } = require('mongoose');
const songSchema = require('./Song');
const dateFormat = require('../utils/dateFormat');

const playlistSchema = new Schema(
    {
        listName: {
            type: String,
            required: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        songs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Song'
            }
        ],
        user_id: 
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }

    }
);

const Playlist = model('Playlist', playlistSchema);

module.exports = Playlist;