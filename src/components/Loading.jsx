import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="text-center my-3">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Caricamento...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
