import React from "react";
import { Card } from "react-bootstrap";

function SingleBook({ book, selected, onBookSelect }) {
  const handleClick = () => {
    onBookSelect(selected ? null : book.asin);
  };

  return (
    <Card className={`h-100 ${selected ? "border border-danger shadow" : ""}`} onClick={handleClick} style={{ cursor: "pointer" }}>
      <Card.Img variant="top" src={book.img} alt={`Cover di ${book.title}`} />
      <Card.Body>
        <Card.Title className="text-center">{book.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default SingleBook;
