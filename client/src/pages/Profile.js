import React from 'react'
import PopulatePlaylist from '../components/MyPlaylist'
import AuthService from '../utils/auth';
import PopulateComments from '../components/MyComments'


const Profile = () => {

  const authService = AuthService;
  const isAuth = authService.isAuth();

  if (!isAuth) {
    return (
      <div className="ui center aligned grid">
        <div className="center aligned two column row">
          <div className="column">
            <div className="ui segment">
              <h1>Please log in to view your profile</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="ui center aligned grid">
      <div className="center aligned two column row">
        <PopulatePlaylist />
        <PopulateComments />
        {/* <div className="column">
          <div className="ui segment">
            <h1 className='comment-heading'>Comments</h1>
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
                <p>Comment</p> */}
      </div>
    </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Profile