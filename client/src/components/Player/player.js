import { useState, useEffect } from "react"
// cool library that will take care of the playing functionality 
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  // everytime user changes track we will setPlay = true and this will start the play, so the user dosent have to slect play
  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      // show save icon will save songs to the users spotify library
      showSaveIcon
      // if the player is not playing we set the setPlay = false, this will allow us to start it back up when the next song is selected
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      // pass in the track that we want to play, if we dont have a track to play we have to pass in an empty array, because it always expects something in it
      uris={trackUri ? [trackUri] : []}
    />
  )
}
