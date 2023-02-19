const { getRequest } = require("../../utils/request");

module.exports = {
  album: async (args, req) => {
    try {
      const album = await getRequest(req, "/albums/" + args.id);

      album.tracks = album.tracks.items;

      return album;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  albums: async (args, req) => {
    try {
      const result = await getRequest(req, "/albums/?ids=" + args.ids);

      let albums = [];
      result.albums.map(album => {
        album.tracks = album.tracks.items;
        albums.push(album);
      });

      return albums;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  albumTracks: async (args, req) => {
    try {
      const result = await getRequest(req, "/albums/" + args.id + "/tracks");
      return result.items;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
