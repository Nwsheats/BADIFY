const userResolver = require("./user");
const playlistResolver = require("./playlist");
const trackResolver = require("./track");
const artistResolver = require("./artist");
const albumResolver = require("./album");


const rootResolver = {
  ...userResolver,
  ...playlistResolver,
  ...trackResolver,
  ...artistResolver,
  ...albumResolver,
};

module.exports = rootResolver;
