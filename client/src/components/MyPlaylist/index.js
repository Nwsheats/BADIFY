import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";


const PopulatePlaylist = () => {
    const { loading, data: userData } = useQuery(QUERY_ME);
    
        const [ listState, setListState ] = useState({});

    useEffect(() => {
        if (userData) 
            console.log(userData)
            // const data = userData.playlist.map(playlist => playlist)
            // console.log("listData", data)
            // setListState(data)
}, [userData])

    return (
        <div className="column">
        <div className="ui segment">
          <h1>My Playlist</h1>
          <div>
            <div className="single-playlist">
              <h3>{listState.songTitle}</h3>
              <p>{listState.artistName}</p>
            </div>
            {/* <div className="single-playlist">
              <h3>Song Title</h3>
              <p>Artist Name</p>
            </div>
            <div className="single-playlist">
              <h3>Song Title</h3>
              <p>Artist Name</p>
            </div> */}
          </div>
        </div>
      </div>
    );


}

export default PopulatePlaylist;