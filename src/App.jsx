import "./App.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter, NavLink} from "react-router-dom";
import Book from "./components/Book";
import Home from "./components/Home"
import Log from "./components/Log"
import Wishlist from "./components/Wishlist"

function App() {
  return (
    <BrowserRouter> {/* Wrap your entire application with BrowserRouter */}
      <div>
        <nav className="top-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/wishlist">Wishlist</NavLink>
          <NavLink to="/log">Reading Log</NavLink>
        </nav>
        
        <Routes>
          <Route path="/books" element={<Book/>} />
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<Log />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
