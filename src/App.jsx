import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert } from "react-bootstrap";
import fantasy from "./data/fantasy.json";
import NavBar from "./components/myNav.jsx";
import Footer from "./components/Footer.jsx";
import Welcome from "./components/welcome.jsx";
import AllTheBooks from "./components/AllTheBooks.jsx";
import SingleBook from "./components/SingleBook.jsx";
import BookList from "./components/BookList.jsx";
function App() {
  return (
    <>
      <NavBar></NavBar>
      <Welcome></Welcome>
      <AllTheBooks />
      <Container className="mt-5">
        <Alert variant="primary">Benvenuto nella sezione Fantasy!</Alert>
      </Container>
      <SingleBook book={fantasy[0]}></SingleBook>
      <BookList libri={fantasy}></BookList>
      <Footer></Footer>
    </>
  );
}

export default App;
