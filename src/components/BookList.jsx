import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";

function BookList({ libri }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = libri.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleBookSelect = (asin) => {
    setSelectedBook(asin);
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        {/* Colonna Libri (occupa 8/12 dello spazio su desktop, pieno su mobile) */}
        <Col xs={12} md={8}>
          <Form.Group controlId="searchBooks" className="mb-4">
            <Form.Control type="text" placeholder="Cerca per titolo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </Form.Group>

          <Row>
            {filteredBooks.map((book) => (
              <Col key={`${book.asin}-${book.category}`} xs={12} sm={6} lg={4} className="mb-4">
                <SingleBook book={book} selected={selectedBook === book.asin} onBookSelect={handleBookSelect} />
              </Col>
            ))}
          </Row>
        </Col>

        {/* Colonna Commenti (occupa 4/12 dello spazio su desktop, nascosta su mobile se nessun libro è selezionato) */}
        <Col xs={12} md={4} className={`mt-3 mt-md-0 ${!selectedBook && "d-none d-md-block"}`}>
          <div className="sticky-top" style={{ top: "70px" }}>
            <div className="border rounded p-3 bg-light">
              <h4 className="mb-3">Area Recensioni</h4>
              {selectedBook ? <CommentArea bookId={selectedBook} /> : <p className="text-muted">Seleziona un libro per vedere le recensioni</p>}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BookList;
