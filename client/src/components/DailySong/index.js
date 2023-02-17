import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
// import { ADD_SONG_TO_PLAYLIST } from '../../utils/mutations';
import { QUERY_SONGS, QUERY_PLAYLIST } from '../../utils/queries';

const DailySong = () => {
    const { loading, songData } = useQuery(QUERY_SONGS);
    console.log(songData);

    // const [songTitle, setTitle] = useState('');
    // const [songArtist, setArtist] = useState('');
    // const [addSongToPlaylist, {error}] = useMutation(ADD_SONG_TO_PLAYLIST) 

    // const handleChange = (event) => {
    //     if (event.target.value)
    // }

    return (
        <div>
        { songData }
        </div>
        );
}

// filter out values that are equivalent to the

// array of objects, all songs
// filter array of objects

export default DailySong;