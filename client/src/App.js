import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Home/Nav";
import Login from "./components/register/Login"
import Signup from "./components/register/Signup"
import Upload from "./components/actions/Upload"
import Book from "./components/actions/Book"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
