import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const PopulatePlaylist = () => {
  const [listState, setListState] = useState([]);
  const [commentState, setCommentState] = useState([]);

  const { loading, error, data: userData } = useQuery(QUERY_ME);
  console.log(userData);

  useEffect(() => {
    if (userData && userData.me && userData.me.playlist) {
      console.log(typeof userData.me);
      const userPlaylist = userData.me.playlist;
      console.log(userPlaylist);
      setListState(userPlaylist);
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData.me && userData.me.comments) {
      console.log(typeof userData.me);
      const userComments = userData.me.comments;
      console.log(userComments);
      setCommentState(userComments);
    }
  }, [userData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="column">
      <div className="ui segment">
        <h1 className="playlist-heading">My Terrible Playlist</h1>
        <div className="all-playlist">
          {listState.map((playlist) => (
            <div className="single-playlist" key={playlist._id}>
              <div className="playlist-img-container">
                <img
                  className="playlist-image"
                  src={playlist.songImage}
                  alt=""
                />
                <div className="playlist-text">
                  <h3>{playlist.songTitle}</h3>
                  <p>{playlist.artistName}</p>
                </div>
              </div>
              <a href={playlist.songUrl} target="_blank">
                <button className="playlist-btn">Play on Spotify</button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopulatePlaylist;
