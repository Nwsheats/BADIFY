const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        firstname: String
        lastname: String
        email: String
        password: String
        createdAt: String
        comments: [Comment]
        playlist: [Song]
        listname: String
    }

    type Song {
        _id: ID
        songDay: Int
        songTitle: String
        artistName: String
        recordLabel: String
        releaseYear: Int
        createdAt: String
        submittedBy: String
        comments: [Comment]
        commentCount: Int
    }

    type Comment {
        _id: ID
        username: String
        commentText: String
        createdAt: String
        songId: [Song]
    }

#    type Playlist {
#        user_id: ID!
#        listName: String
#        createdAt: String
#        songs: [Song] 
#    }

    type Auth {
        token: ID!
        user: User
    }

    #spotify api
    type PrivateUser {
    id: String
    country: String
    display_name: String
    email: String
    href: String
    images: [Image]
    product: String
    uri: String
    }

    type PublicUser {
    id: ID
    display_name: String
    href: String
    uri: String
    playlists: [Playlist]
    images: [Image]
    }

    type Track {
    id: ID
    album: Album
    artists: [Artist]
    available_markets: [String]
    disc_number: Int
    duration_ms: Int
    explicit: Boolean
    href: String
    is_playable: Boolean
    name: String
    popularity: Int
    preview_url: String
    track_number: Int
    type: String
    uri: String
    }

    type Album {
    id: ID
    album_type: String
    artists: [Artist]
    available_markets: [String]
    genres: [String]
    href: String
    images: [Image]
    label: String
    name: String
    popularity: Int
    release_date: String
    release_date_precision: String
    tracks: [Track]
    type: String
    uri: String
    }

    type Artist {
    id: ID
    genres: [String]
    href: String
    images: [Image]
    name: String
    popularity: Int
    type: String
    uri: String
    followers: Followers
    }

    type Playlist {
    id: ID
    collaborative: Boolean
    description: String
    href: String
    images: [Image]
    name: String
    owner: PublicUser
    uri: String
    tracks: [PlaylistTrack]
    public: Boolean
    }

    type Playlists {
    id: ID
    collaborative: Boolean
    description: String
    href: String
    images: [Image]
    name: String
    owner: PublicUser
    uri: String
    tracks: PlaylistsTrack
    public: Boolean
    }

    type PlaylistsTrack {
    href: String
    total: Int
    }

    type PlaylistTrack {
    added_at: String
    added_by: String
    track: Track
    }

    type Image {
    height: Int
    url: String
    width: Int
    }

    type Followers {
    href: String
    total: Int
    }  

    type MyTopTracks {
    tracks: [Track]
    }

    type MyTopArtists {
    artists: [Artist]
    }

    type SnapshotID {
    snapshot_id: String
    }

    input PlaylistInput {
    user_id: String!
    name: String!
    public: Boolean
    collaborative: Boolean
    description: String
    }

    input AddTracksInput {
    playlist_id: String!
    uris: [String]
    position: Int
    }
    #spotify api



    type Query {
        users: [User]
        user(username: String): User
        comments(songId: String, username: String): [Comment]
        comment(_id: String): Comment
    #   playlist(_id: String): Playlist
        songs: [Song]
        song(_id: String): Song
    #spotify api
        me: PrivateUser
        user(id: String!): PublicUser
        myTopTracks(time_range: String): MyTopTracks
        myTopArtists(time_range: String): MyTopArtists
        track(id: String!): Track
        tracks(ids: String!): [Track]
        artist(id: String!): Artist
        artists(ids: String!): [Artist]
        artistTopTracks(id: String!, country: String!): [Track]
        artistAlbums(id: String!, market: String, include_groups: String): [Album]
        artistRelated(id: String!): [Artist]
        album(id: String!): Album
        albums(ids: String!): [Album]
        albumTracks(id: String!): [Track]
        playlist(id: String!): Playlist
        userPlaylists(id: String!): [Playlists]
        myPlaylists: [Playlists]
    #spotify api
    }



    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addComment(commentText: String!, songId: String!, userName: String!): Comment
        addSongToPlaylist(songId: ID, songDay: Int, songTitle: String!, artistName: String!): User
    #    updatePlaylist(listName: String, songs: [String]): Playlist
        removeSongFromPlaylist(songId: ID!): User
    #  still nee to add updatePlaylist, addSongToPlaylist, removeSongFromPlaylist
    #spotify api
        createPlaylist(playlistInput: playlistInput): Playlist
        addTracksToPlaylist(addTracksInput: addTracksInput): snapshotID
    #spotify api

    }
`;

// query for Spotify Login = get token
// query for Spotify refresh = get token

module.exports = typeDefs;