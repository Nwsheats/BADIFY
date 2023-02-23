import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";


const PopulateComments = () => {
    const [commentState, setCommentState] = useState([]);

    const { loading, error, data: userData } = useQuery(QUERY_ME);
    console.log(userData);

    useEffect(() => {
        if (userData && userData.me && userData.me.comments) {
            console.log(typeof userData.me)
            const userComments = userData.me.comments;
            console.log(userComments)
            setCommentState(userComments)
        }
    }, [userData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>

    return (
        <div className="column">
            <div className="ui segment">
                <h1 className="comments-heading">My Terrible Comments</h1>
                <div className="my-comments">
                    {commentState.map((comments) => (
                        <div className="single-comment" key={comments._id}>
                            <div className="comment-text">
                                <h3>{comments.commentText}</h3>
                                <p>{comments.createdAt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopulateComments;