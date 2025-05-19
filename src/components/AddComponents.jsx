import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";

function AddComment({ bookId, onCommentAdded }) {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Per favore inserisci un commento");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        body: JSON.stringify({
          comment: comment,
          rate: rate,
          elementId: bookId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI1ZGFlMjFlYmU4MjAwMTUwOWYyZmUiLCJpYXQiOjE3NDczMTEzMzAsImV4cCI6MTc0ODUyMDkzMH0.pknfFwxBBuEJxGmqakFP8x52DNzUApAH2om4A0XOy8Q",
        },
      });

      if (!response.ok) {
        throw new Error(`Errore durante l'invio del commento: ${response.status}`);
      }

      // Reset del form
      setComment("");
      setRate(1);

      // Notifica il componente padre che un nuovo commento è stato aggiunto
      onCommentAdded();
    } catch (error) {
      console.error("Errore durante l'invio della recensione:", error);
      setError("Impossibile inviare la recensione");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <div className="add-comment mt-4">
      <h6>Aggiungi una recensione</h6>

      {error && <Error message={error} />}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="commentText">
          <Form.Label>Commento</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Scrivi la tua recensione qui..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSubmitting}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rateValue">
          <Form.Label>Valutazione</Form.Label>
          <Form.Select value={rate} onChange={(e) => setRate(parseInt(e.target.value))} disabled={isSubmitting}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Invia recensione
        </Button>
      </Form>
    </div>
  );
}

export default AddComment;
