import React from 'react'
import PopulatePlaylist from '../components/MyPlaylist'


const Profile = () => {

  return (
    <div className="ui center aligned grid">
      <div className="center aligned two column row">
      <PopulatePlaylist />
        <div className="column">
          <div className="ui segment">
            <h1>Comments</h1>
            <div>
              <div className="single-comment">
                <h3>Username</h3>
                <p>Comment</p>
              </div>
              <div className="single-comment">
                <h3>Username</h3>
                <p>Comment</p>
              </div>
              <div className="single-comment">
                <h3>Username</h3>
                <p>Comment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile