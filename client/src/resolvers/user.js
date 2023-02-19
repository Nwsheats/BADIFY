const { getRequest } = require("../../utils/request");

module.exports = {
  me: async (_, req) => {
    try {
      const me = await getRequest(req, "/me");
      return me;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  user: async (args, req) => {
    try {
      const user = await getRequest(req, "/users/" + args.id);
      return user;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  myTopTracks: async (args, req) => {
    try {
      const result = await getRequest(
        req,
        `/me/top/tracks?time_range=${args.time_range}`
      );
      return result.items;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  myTopArtists: async (args, req) => {
    try {
      const result = await getRequest(
        req,
        `/me/top/artists?time_range=${args.time_range}`
      );
      return result.items;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
