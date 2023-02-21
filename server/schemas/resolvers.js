const { AuthenticationError } = require('apollo-server-express');
const { User, Song, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('comments')
          .populate('playlist');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
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
    songs: async () => {
      return Song.find()
        .populate('comments');
    },
    song: async (parent, { _id }) => {
      return Song.findOne({ _id })
        .populate('comments')
      // .populate('songUri')
      // .populate('songUrl')
      // .populate('songImage');
    },
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

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
    // need to work on this and make sure that comments are pushed to Songs
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
    },
    // intended to add the DailySong to the playlist database
    addSongToPlaylist: async (parent, { songId }, context) => {
      if (context.user) {
        console.log("songId", songId)
        console.log("userId", context.user)
        
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              playlist: songId
            }
          },
          {
            new: true,
            runValidators: true,
          },
        );
      }
      throw new AuthenticationError('You need to be logged in!')
      // push to the song sub document array in the Playlist db
    },
    // KEEP THIS ONE AROUND: this will stop the same song from being added 
    //to the playlist. Cycle in this one when testing is done on the above.
  //   addSongToPlaylist: async (parent, { songId }, context) => {
  //     if (context.user) {
  //       const userId = context.user._id;
  //       console.log("songId", songId)
  //       console.log("userId", context.user)
  //       const playlist = await User.findById(userId).select('playlist').lean();
  //       if (playlist.playlist.includes(songId)) {
  //         throw new UserInputError('Song is already in the playlist');
  //       }
  //       const updatedUser = await User.findOneAndUpdate(
  //         userId,
  //         { $addToSet: { playlist: songId }},
  //         { new: true },
  //       ).lean();
  //       return updatedUser;
  //     } else {
  //       throw new AuthenticationError('You need to be logged in!')
  //   }
  // },
    removeSongFromPlaylist: async (parent, { songId }, context) => {
      if (context.user) {
        console.log("songId", songId)

        console.log("userId", context.user)
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              playlist: songId
            }
          },
          {
            new: true,
            runValidators: true,
          },
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!')
    },
  },
};

module.exports = resolvers;