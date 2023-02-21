import React, { useState, useEffect } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SONG_TO_PLAYLIST, ADD_COMMENT } from '../../utils/mutations';
import { QUERY_SONGS, QUERY_COMMENTS } from "../../utils/queries";
import AuthService from "../../utils/auth";

const DailySong = ({ songId }) => {
    const { loading: songLoading, data: songData } = useQuery(QUERY_SONGS);

    const [ songState, setSongState ] = useState({});
    const [ addSongClick, setAddSongClick ] = useState(false);
    const [ songIdState, setSongIdState ] = useState('');
    const [ commentText, setCommentText ] = useState('');

    // credit to Alex Turpin & Koen Peters on stackoverflow for this date to number code: 
    // https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);

    const authService = AuthService;
    const isAuth = authService.isAuth();
    console.log(isAuth)
    
    useEffect(() => {
        if (songData) {
        const daySong = songData.songs.filter(song => song.songDay === day)[0]
        console.log("daySong", daySong);
        setSongState(daySong);
        setSongIdState(daySong._id);
        }
    }, [songData, day])

    const [addSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);
    const [addComment] = useMutation(ADD_COMMENT);

    const { loading: commentsLoading, data: commentsData, refetch: refetchComments } = useQuery(QUERY_COMMENTS, {variables: {songId: songIdState}})

    const handleAddSongToPlaylist = () => {
            console.log("songIdvalue", songState._id)
            if (!isAuth) {
            return;
            }
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

    if (songLoading || commentsLoading) return <p>Loading...</p>;
    // if (commentsError) return <p>Error :</p>;
    // console.log(commentsError)
    console.log(songIdState)
    console.log(commentsData)
    console.log(songState.comments)

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
          await addComment({
            variables: { songId: songState._id, commentText: commentText }
          });
          setCommentText('');
          await refetchComments();
        } catch (e) {
          console.error(e);
        }
      };

    return (
    <div className="song-details-container">
        <Jumbotron style={{height: "fit-content"}}>
        <h1>The Bad Song of the Day is:</h1>
        <h2>{songState.songTitle}</h2>
        <h2>{songState.artistName}</h2>
        {
        isAuth ? (
        <Button bsstyle="primary" onClick={handleAddSongToPlaylist} disabled={addSongClick}>
        Add To Playlist
        </Button>
        ) : (
        <p>Please log in to add this song to your playlist.</p>
        )
        }
        <div>
            <div><a href={songState.songUrl}><img style={{backgroundImage: `url(${songState.songImage})`}} src={songState.songImage} alt=''></img></a></div>
        </div>
      </Jumbotron>
    <div className="ui segment">
    <h2>Comments</h2>
    <div>
    {songState.comments.map(comment => {
        console.log(comment.user);
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
