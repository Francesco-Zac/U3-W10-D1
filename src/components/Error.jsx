import React from "react";
import { Alert } from "react-bootstrap";

function Error({ message }) {
  return (
    <Alert variant="danger" className="my-3">
      {message || "Si è verificato un errore"}
    </Alert>
  );
}

export default Error;
