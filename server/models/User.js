const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const dateFormat = require('../utils/dateFormat');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        firstname: {
            type: String,
            required: false
        },
        lastname: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            reqired: true,
            minlength: 5
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
        ],
        playlist: [
            {
                type Schema.Types.ObjectId,
                ref: 'Playlist'
            }
        ]

    }
);
// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcryptjs.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


const User = model('User', userSchema);

module.exports = User;