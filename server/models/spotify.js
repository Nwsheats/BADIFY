const { Schema, model } = require('mongoose');

const spotifySchema = new Schema(
  {
    privateUser:{
    type: PrivateUser, 
    id: String,
    country: String,
    display_name: String,
    email: String,
    href: String,
    images: [Image],
    product: String,
    uri: String
    },
    publicUser:{
    type: PublicUser, 
    id: ID,
    display_name: String,
    href: String,
    uri: String,
    playlists: [Playlist],
    images: [Image]
    },
  track:{
    type: Track, 
    id: ID,
    album: Album,
    artists: [Artist],
    available_markets: [String],
    disc_number: Int,
    duration_ms: Int,
    explicit: Boolean,
    href: String,
    is_playable: Boolean,
    name: String,
    popularity: Int,
    preview_url: String,
    track_number: Int,
    type: String,
    uri: String,
    },
  album:{
    type: Album, 
    id: ID,
    album_type: String,
    artists: [Artist],
    available_markets: [String],
    genres: [String],
    href: String,
    images: [Image],
    label: String,
    name: String,
    popularity: Int,
    release_date: String,
    release_date_precision: String,
    tracks: [Track],
    type: String,
    uri: String,
    },
  artist: {
    type: Artist, 
    id: ID,
    genres: [String],
    href: String,
    images: [Image],
    name: String,
    popularity: Int,
    type: String,
    uri: String,
    followers: Followers,
    },
  playlist: {
    type: Playlist, 
    id: ID,
    collaborative: Boolean,
    description: String,
    href: String,
    images: [Image],
    name: String,
    owner: PublicUser,
    uri: String,
    tracks: [PlaylistTrack],
    public: Boolean,
    },
  playlists: {
    type: Playlists, 
    id: ID,
    collaborative: Boolean,
    description: String,
    href: String,
    images: [Image],
    name: String,
    owner: PublicUser,
    uri: String,
    tracks: PlaylistsTrack,
    public: Boolean,
    },
  playlistTrack: {
    type: PlaylistsTrack, 
    href: String,
    total: Int,
    },
  playlistTrack: {
    type: PlaylistTrack, 
    added_at: String,
    added_by: String,
    track: Track,
    },
  image: {
    type: Image, 
    height: Int,
    url: String,
    width: Int,
    },
  followers: {
    type: Followers,
    href: String,
    total: Int,
    },
  myTopTracks: {
    type: MyTopTracks,
    tracks: [Track],
    },
  myTopArtists: {
    type: MyTopArtists,
    artists: [Artist],
    },
  snapshotId: {
    type: SnapshotID,
    snapshot_id: String,
    },
  playlistInput: {
    input: PlaylistInput,
    user_id: String,
    name: String,
    public: Boolean,
    collaborative: Boolean,
    description: String,
    },
  addTracksInput: {
    input: AddTracksInput,
    playlist_id: String,
    uris: [String],
    position: Int,
    },
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

const Spotify = model('Spotify', spotifySchema);

module.exports = Spotify;