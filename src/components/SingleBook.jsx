import React from "react";
import { Card } from "react-bootstrap";

function SingleBook({ book, isSelected, onSelect }) {
  return (
    <Card className={`h-100 ${isSelected ? "border border-danger" : ""}`} style={{ cursor: "pointer" }} onClick={() => onSelect(book.asin)}>
      <Card.Img variant="top" src={book.img} alt={`Cover di ${book.title}`} />
      <Card.Body>
        <Card.Title className="text-center">{book.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default SingleBook;
