import "./App.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Book from "./components/Book";

function App() {
  return (
    <BrowserRouter> {/* Wrap your entire application with BrowserRouter */}
      <div>
        <nav className="top-nav">
          <a href="/books">Books</a>
        </nav>
        
        <Routes>
          <Route path="/books" element={<Book />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
