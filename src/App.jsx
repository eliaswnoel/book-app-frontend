import "./App.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter, NavLink} from "react-router-dom";
import Book from "./components/Book";
import Home from "./components/Home";
import Wishlist from "./components/Wishlist"

function App() {
  return (
    <BrowserRouter> {/* Wrap your entire application with BrowserRouter */}
      <div>
        <nav className="top-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/books">Reading Log</NavLink>
          <NavLink to="/wishlist">Wishlist</NavLink>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Book/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
