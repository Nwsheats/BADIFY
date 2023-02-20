const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        commentText: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        songId: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Song'
            }
        ]
    });

const Comment = model('Comment', commentSchema);

module.exports = Comment;
