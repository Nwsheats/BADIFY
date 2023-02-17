import React from 'react';
import { Link } from 'react-router-dom';

const LocalPlaylist = ({ playlist, title }) => {
    if (!playlist.length) {
        return <h3>No Local Play List</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {playlist &&
                playlist.map(playlist => (
                    <div key={playlist._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/profile/${playlist.username}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                {playlist.username}
                            </Link>{' '}
                            thought on {playlist.createdAt}
                        </p>
                        <div className="card-body">
                            <Link to={`/thought/${playlist._id}`}>
                                <p>{playlist.listName}</p>
                                {/* <p className="mb-0">
                                    Reactions: {thought.reactionCount} || Click to{' '}
                                    {thought.reactionCount ? 'see' : 'start'} the discussion!
                                </p> */}
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default LocalPlaylist;
