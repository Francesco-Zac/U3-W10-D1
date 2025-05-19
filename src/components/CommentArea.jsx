import React, { useState, useEffect } from "react";
import CommentsList from "./CommentList";
import AddComment from "./AddComponents";
import Loading from "./Loading";
import Error from "./Error";

function CommentArea({ bookId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    if (!bookId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${bookId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI1ZGFlMjFlYmU4MjAwMTUwOWYyZmUiLCJpYXQiOjE3NDczMTEzMzAsImV4cCI6MTc0ODUyMDkzMH0.pknfFwxBBuEJxGmqakFP8x52DNzUApAH2om4A0XOy8Q",
        },
      });

      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Errore durante il recupero dei commenti:", error);
      setError("Si è verificato un errore durante il recupero dei commenti");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [bookId]);

  const handleCommentAdded = () => {
    // Aggiorna i commenti dopo che un nuovo commento è stato aggiunto
    fetchComments();
  };

  const handleCommentDeleted = () => {
    // Aggiorna i commenti dopo che un commento è stato eliminato
    fetchComments();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="comment-area mt-3">
      <h5>Recensioni</h5>
      <CommentsList comments={comments} onCommentDeleted={handleCommentDeleted} />
      <AddComment bookId={bookId} onCommentAdded={handleCommentAdded} />
    </div>
  );
}

export default CommentArea;
