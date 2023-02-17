import React from 'react'


import LocalPlaylist from '../components/LocalPlayList/localPlayList'

// import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Profile = () => {
  const user = 'testuser1';
  // const { username: userParam } = 'testuser1';

  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });

  // const user = data?.me || data?.user || {};

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <LocalPlaylist
            playlist={user.playlist}
            title={`${user.username}'s ${user.listName}...`}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile