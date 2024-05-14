import "./App.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter, NavLink} from "react-router-dom";
import Book from "./components/Book";
import Home from "./components/Home"

function App() {
  return (
    <BrowserRouter> {/* Wrap your entire application with BrowserRouter */}
      <div>
        <nav className="top-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/books">Books</NavLink>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Book />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
