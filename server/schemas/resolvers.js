const { AuthenticationError } = require('apollo-server-express');
const { User, Song, Playlist, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('comments')
        .populate('playlist');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('comments')
        .populate('playlist');
    },
    comments: async (parent, { songId, username }) => {
      const params = {}
      if (username) {
        params['username'] = username;
      }
      if (songId) {
        params['songId'] = songId;
      }
      return Comment.find(params).sort({ createdAt: -1 });
    },
    comment: async (parent, { _id }) => {
      return Comment.findOne({ _id })
    },
    playlist: async (parent, { _id }) => {
      return Playlist.findOne({ _id })
    },
    songs: async () => {
      return Song.find()
        .populate('comments');
    },
    song: async (parent, { _id }) => {
      return Song.findOne({ _id })
        .populate('comments');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    //addComment
    addComment: async (parent, args, context) => {
      if (context.user) {
        const comment = await Comment.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { comments: comment._id } },
          { new: true }
        );

        return comment;
      }
      //updatePlaylist, addSongToPlaylist, removeSongFromPlaylist,  
      //updatePlaylist: sending in the name and the full song playlist

    }

  }
};


module.exports = resolvers;