import { useEffect, useState } from "react";
import { getComments } from "../../../managers/comments/CommentManager";

export const CommentSection = ({postId}) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments(postId).then(comments => setComments(comments))
    },[])
    return (
      <div className="comment-section">
       { comments.map(c => <p key={c.id}>{c.content}</p>)}
      </div>
    );
  };