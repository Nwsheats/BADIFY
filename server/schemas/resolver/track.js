const { getRequest } = require("../../utils/request");

module.exports = {
  track: async (args, req) => {
    try {
      const result = await getRequest(req, "/tracks/" + args.id);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  tracks: async (args, req) => {
    try {
      const result = await getRequest(req, "/tracks/?ids=" + args.ids);
      return result.tracks;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
