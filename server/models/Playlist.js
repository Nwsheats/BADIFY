const { Schema, model } = require('mongoose');
const songSchema = require('./Song');
const dateFormat = require('../utils/dateFormat');

const playlistSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
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
        ]

    }
);

const Playlist = model('Playlist', playlistSchema);

module.exports = Playlist;