import React, { useState, useEffect, useRef } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
// import { ADD_SONG_TO_PLAYLIST } from '../../utils/mutations';
import { QUERY_SONGS, QUERY_PLAYLIST } from "../../utils/queries";
import { songsData } from "../Data/data";

// const [songTitle, setTitle] = useState('');
// const [songArtist, setArtist] = useState('');
// const [addSongToPlaylist, {error}] = useMutation(ADD_SONG_TO_PLAYLIST)

// const handleChange = (event) => {
//     if (event.target.value)
// }

const DailySong = () => {
  const { loading, data: songData } = useQuery(QUERY_SONGS);

    const [ songState, setSongState ] = useState({});

    // credit to Alex Turpin & Koen Peters on stackoverflow: 
    // https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);


    
    useEffect(() => {
        if (songData) {
        const daySong = songData.songs.filter(song => song.songDay === day)[0]
        console.log("daySong", daySong);
        setSongState(daySong);
        }
    }, [songData])


    return (
        <div>
        <Jumbotron>
        <h1>The Bad Song of the Day is:</h1>
        <h2>{songState.songTitle}</h2>
        <h2>{songState.artistName}</h2>
    
        <Button bsstyle="primary">Add To Playlist</Button>
      </Jumbotron>
    </div>
  );
};

export default DailySong;
