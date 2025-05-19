import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import fantasy from "../data/fantasy.json";
import history from "../data/history.json";
import horror from "../data/horror.json";
import romance from "../data/romance.json";
import scifi from "../data/scifi.json";

function AllTheBooks() {
  const [libri, setLibri] = useState([]);

  useEffect(() => {
    const ogniLibro = [...fantasy, ...history, ...horror, ...romance, ...scifi];
    setLibri(ogniLibro);
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Row>
          {libri.map((libro) => (
            <Col key={`${libro.asin}-${libro.category}`} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={libro.img} alt={`Cover di ${libro.title}`} />
                <Card.Body>
                  <Card.Title>{libro.title}</Card.Title>
                  <Card.Text className="text-success">€ {libro.price.toFixed(2)}</Card.Text>

                  <Card.Footer className="text-muted text-capitalize">{libro.category}</Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default AllTheBooks;
