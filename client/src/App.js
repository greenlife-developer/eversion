import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Home/Nav";
import Login from "./components/register/Login";
import Signup from "./components/register/Signup";
import Upload from "./components/actions/Upload";
import Book from "./components/actions/Book";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/api/register" element={<Signup />} />
          <Route path="/api/login" element={<Login />} />
          <Route path="/api/upload" element={<Upload />} />
          <Route path="/api/book" element={<Book />} />
          <Route path="/api/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;