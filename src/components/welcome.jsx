import { Alert, Container } from "react-bootstrap";

function Welcome() {
  return (
    <>
      <Container className="mt-5">
        <Alert variant="primary">Benvenuto nel mio shop!</Alert>
      </Container>
    </>
  );
}

export default Welcome;
