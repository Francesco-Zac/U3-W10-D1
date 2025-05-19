import React, { useState } from "react";
import { ListGroup, Button, Badge } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";

function SingleComment({ comment, onCommentDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!window.confirm("Sei sicuro di voler eliminare questa recensione?")) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${comment._id}`, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI1ZGFlMjFlYmU4MjAwMTUwOWYyZmUiLCJpYXQiOjE3NDczMTEzMzAsImV4cCI6MTc0ODUyMDkzMH0.pknfFwxBBuEJxGmqakFP8x52DNzUApAH2om4A0XOy8Q",
        },
      });

      if (!response.ok) {
        throw new Error(`Errore durante l'eliminazione: ${response.status}`);
      }

      // Notifica il componente padre che il commento è stato eliminato
      onCommentDeleted();
    } catch (error) {
      console.error("Errore durante l'eliminazione della recensione:", error);
      setError("Impossibile eliminare la recensione");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {comment.author}
          <Badge bg="warning" className="ms-2">
            {comment.rate} ⭐
          </Badge>
        </div>
        {comment.comment}
      </div>
      <Button variant="outline-danger" size="sm" onClick={handleDelete} disabled={isDeleting}>
        Elimina
      </Button>
    </ListGroup.Item>
  );
}

export default SingleComment;
