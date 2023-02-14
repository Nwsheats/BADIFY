const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const songSchema = new Schema(
    {
        songDay: {
            type: Number,
            required: true
        },
        // Idea for later if we want to change the index to represent other calendar items.
        // songWeek: {
        //     type: Number,
        //     required: true
        // },
        // songMonth: {
        //     type: Number,
        //     required: true
        // },
        songTitle: {
            type: String,
            required: true
        },
        artistName: {
            type: String,
            required: true
        },
        recordLabel: {
            type: String,
            required: false
        },
        releaseYear: {
            type: String,
            required: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

//create virtual for comment count on each song
songSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

const Song = model('Song', songSchema);

module.exports = Song;