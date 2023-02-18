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
    },
    // intended to add the DailySong to the playlist database
    addSongToPlaylist: async (parent, { songId, songTitle, songArtist }, context) => {
      if (context.user) {
      return Playlist.findOneAndUpdate(
        { _id: songId },
        { $addToSet: {
          songs: { songTitle, songArtist },
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
        // research mongoose pushing into a sub document array.
    }
  },

    // intended to take the new songs from addSongToPlaylist and/or any other changes like 
    // Playlist name and update both, returning a new Playlist with all the updated data.
    // updatePlaylist: async (parent, args, context) => {
    //   if (context.user) {
    //     const playlist = await Playlist.findOneAndUpdate(
    //       { _id: context.user.id},
    //       { listName: context.listName },
    //       { songs: args },
    //       { new: true }
    //       );

    //       return new Playlist(playlist);
    //   }
    // },
  };


module.exports = resolvers;