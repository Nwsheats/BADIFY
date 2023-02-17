import React from 'react'

import { useState, useEffect } from "react"
import useAuth from "../utils/spotifyAuth"
import Player from "../components/Player/Player"
import TrackSearchResult from "../components/SearchResults/SearchResult"
import { Container, Form } from "react-bootstrap"
// spotify-web-api-node also works in the browser even though it is called node
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";


const spotifyApi = new SpotifyWebApi({
  // client ID is public information so no need to hide it
  clientId: "dde5d7420bed4152a0ea41e85917b4ab",
});

export default function Home({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  // this is how we pass what we select in to the player
  function chooseTrack(track) {
    setPlayingTrack(track);
    // clears out search after we select a track to play
    setSearch("");
    setLyrics("");
  }

  // hook for api to get lyrics
  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  // sets our access toke. If we don't have one return to login
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // hook for the search bar
  useEffect(() => {
    //  if nothing in the search set it to an empty array
    if (!search) return setSearchResults([]);
    // if we dont have any access token dont let us query anything
    if (!accessToken) return;
    // cancel is set true after the query is ran as to not run the query multiple times. When a new search happens it sets the cancel to false allowing the query to run again
    let cancel = false;
    //
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            // loops through all of the retuned images and only gets the one with the smallest hight
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  // style={{ overflowY: "auto" }} will allow us to scroll down through the returned list
  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
   {/* <Banner/> */}
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          // whiteSpace: "pre" allows the words to wrap
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
}
