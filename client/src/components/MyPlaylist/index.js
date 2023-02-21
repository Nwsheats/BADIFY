import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";


const PopulatePlaylist = () => {
    const [ listState, setListState ] = useState([]);

    const { loading, error, data: userData } = useQuery(QUERY_ME);
        console.log(userData)


    useEffect(() => {
        if (userData && userData.me && userData.me.playlist) {
            console.log(typeof userData.me)
            const userPlaylist = userData.me.playlist;
            console.log(userPlaylist)
            setListState(userPlaylist)
        }
    }, [userData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>

    return (
        <div className="column">
        <div className="ui segment">
          <h1>My Terrible Playlist</h1>
          <div>
            {listState.map(playlist => (
                <div className="single-playlist" key={playlist._id}>
                    <h3><a href={playlist.songUrl}>{playlist.songTitle}</a></h3>
                    <p>{playlist.artistName}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    );


}

export default PopulatePlaylist;