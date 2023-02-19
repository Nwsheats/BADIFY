const { getRequest } = require("../../utils/request");

module.exports = {
  artist: async (args, req) => {
    try {
      const artist = await getRequest(req, "/artists/" + args.id);
      return artist;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  artists: async (args, req) => {
    try {
      const result = await getRequest(req, "/artists/?ids=" + args.ids);
      return result.artists;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  artistTopTracks: async (args, req) => {
    try {
      const result = await getRequest(
        req,
        `/artists/${args.id}/top-tracks?country=${args.country}`
      );
      return result.tracks;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  artistAlbums: async (args, req) => {
    try {
      const result = await getRequest(
        req,
        `/artists/${args.id}/albums?market=${args.market}&include_groups=${
          args.include_groups
        }`
      );
      return result.items;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  artistRelated: async (args, req) => {
    try {
      const result = await getRequest(
        req,
        "/artists/" + args.id + "/related-artists"
      );
      return result.artists;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
