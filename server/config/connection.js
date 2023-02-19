const mongoose = require('mongoose');
require("dotenv").config()

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/badify',
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }
);

module.exports = {
  spotify_client_id: process.env.SPOTIFY_CLIENT_ID,
  spotify_client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  spotify_base_url: process.env.SPOTIFY_BASE_URL,
  redirect_uri: process.env.REDIRECT_URI,
  frontend_uri: process.env.FRONTEND_URI,
  mongoose_connection: mongoose.connection
};
