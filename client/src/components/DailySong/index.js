import React, { useState, useEffect } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SONG_TO_PLAYLIST, ADD_COMMENT } from '../../utils/mutations';
import { QUERY_SONGS, QUERY_COMMENTS } from "../../utils/queries";
import AuthService from "../../utils/auth";
import { songImages } from "../../utils/songImages";
import './index.css';

const DailySong = ({ songId }) => {
    // establishing isAuth logic for limiting parts of the page that can be viewed if you are not logged in.
    const authService = AuthService;
    const isAuth = authService.isAuth();

    // Calling Queries and Mutations for QUERY_SONGS, ADD_SONG_TO_PLAYLIST and ADD_COMMENT:
    const { loading: songLoading, data: songData } = useQuery(QUERY_SONGS);
    const [addSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);
    const [addComment] = useMutation(ADD_COMMENT);

    // creating useStates for:

    // songState - what comes back from QUERY_SONGS
    const [songState, setSongState] = useState({});
    // addSongClick - the state for the Add to Playlist button
    const [addSongClick, setAddSongClick] = useState(false);
    // songIdState - specifically returning the songId
    const [songIdState, setSongIdState] = useState('');
    // commentText - the state for the comment text entered in the form of a comment
    const [commentText, setCommentText] = useState('');

    // JavaScript logic to label all the days of the year between 1-366:
    // credit to Alex Turpin & Koen Peters on stackoverflow for this date to number code: 
    // https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);

    // defining songImage and finding the image that matches the songDay from the imported 'songImages' folder
    const songImage = songImages.find((image) => image.songDay === day)?.songImage;

    // useEffect that takes the songData from QUERY_SONGS and filters down to just the song with the matching songDay value, then sets the songState for the corresponding daySong variable (from the backend) and the songImage variable (from the utils folder).    
    useEffect(() => {
        if (songData) {
            const daySong = songData.songs.filter(song => song.songDay === day)[0]
            console.log("daySong", daySong);
            setSongState({ ...daySong, songImage });
            // sets the songIDstate to match the Song Id of daySong
            setSongIdState(daySong._id);
        }
    }, [songData, day, songImage])

    // defining a useQuery for QUERY_COMMENTS based on a specific songId already decided by songIdState above.
    const { loading: commentsLoading, data: commentsData, refetch: refetchComments } = useQuery(QUERY_COMMENTS, { variables: { songId: songIdState } })
    // a function that handles the addSongToPlaylist function IF the user is logged in
    const handleAddSongToPlaylist = () => {
        console.log("songIdvalue", songState._id)
        if (!isAuth) {
            return;
        }
        // passes in the songState._id and sets the state to true to allow the button to be pressed
        // ADD_SONG_TO_PLAYLIST mutation
        addSongToPlaylist({
            variables: { songId: songState._id },
        })
            .then(() => {
                setAddSongClick(true);
            })
            .catch((err) => {
                console.log(err);
            })
        console.log(songState._id)
    };

    // an if statement to return Loading... if song or comment is loading.
    if (songLoading || commentsLoading) return <p>Loading...</p>;
    console.log(songIdState)
    console.log(commentsData)
    console.log(songState.comments)
    // the function that handles the comment submission button and fields
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        // a try statement to use addComment (ADD_COMMENT mutation) and pass along the songId variables and the commentText variables.
        try {
            await addComment({
                variables: { songId: songState._id, commentText: commentText }
            });
            setCommentText('');
            // refetches the comments with the new comment added
            await refetchComments();
        } catch (e) {
            console.error(e);
        }
    };
    console.log('just songstate', songState);

    console.log(songData)
    console.log("comments", songState.comments)
    console.log(songImage)

    // return statement
    return (
        <div className="song-details-container columns 2">
            <div className="song-band-container ">
                <h1>The Bad Song of the Day is:</h1>
                <div className="middel-container">
                    <div className="song-info">
                        <h2><q>{songState.songTitle}</q></h2>
                        <h2>{songState.artistName}</h2>
                        {/* using isAuth from above to limit the ability to see the Add to Playlist button */}
                    </div>
                    {/* Where the song information from songState and songImage are returned */}
                    <div className="songImageContainer">
                        <a href={songState.songUrl}
                            className="square border border-dark"
                            style={{ display: "inline-block", width: "200px", height: "200px", border: "" }}>
                            <img style={{ backgroundImage: `url(${songImage})` }}
                                src={process.env.PUBLIC_URL + "/" + songImage}
                                alt=''>
                            </img>
                        </a>
                    </div>
                </div>
                <div className="btn">{
                    isAuth ? (
                    <div >
                        <Button bsstyle="primary" onClick={handleAddSongToPlaylist} disabled={addSongClick}>
                        Add To Playlist
                        </Button>
                    </div>
                    ) : (
                            <p>Please log in to add this song to your playlist.</p>
                        )
                    }
                </div>
            </div>
            <div className="ui-segment">
                <h1>Comments</h1>
                <div className="comments-list">
                    {songState.comments && songState.comments.map(comment => {
                        return (
                            <div key={comment._id} className="single-comment">
                                <p>{comment.username ? comment.username : 'Unknown User'}</p>
                                <h3>{comment.commentText}</h3>
                            </div>
                        )
                    })}
                </div>
                {isAuth && (
                    <form onSubmit={handleCommentSubmit}>
                        <div className="form-group">
                            <label htmlFor="commentText">Leave a Comment:</label>
                            <textarea
                                className="form-control"
                                id="commentText"
                                rows="3"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                )}
                {!isAuth && (
                    <p>Please log in to leave a comment</p>
                )}
            </div>
        </div>
    );
};

export default DailySong;
