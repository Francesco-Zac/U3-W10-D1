import React from "react";
import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";

function CommentsList({ comments, onCommentDeleted }) {
  return (
    <div className="comments-list mb-4">
      {comments.length > 0 ? (
        <ListGroup>
          {comments.map((comment) => (
            <SingleComment key={comment._id} comment={comment} onCommentDeleted={onCommentDeleted} />
          ))}
        </ListGroup>
      ) : (
        <p className="text-muted">Nessuna recensione disponibile</p>
      )}
    </div>
  );
}

export default CommentsList;
