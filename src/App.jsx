import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, NavLink } from "react-router-dom";
import Book from "./components/Book";
import Home from "./components/Home";
import Wishlist from "./components/Wishlist";
import Reviews from "./components/Reviews";
import ReviewDetails from "./components/ReviewDetails";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Favorite from "./components/Favorites";
import { CheckSession } from "./services/Auth";

const App = () => {
  const [user, setUser] = useState(null);

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
  };

  useEffect(() => {
    checkToken(); // Call checkToken on mount to ensure user session is checked
  }, []);

  return (
    <BrowserRouter>
      {/* Wrap your entire application with BrowserRouter */}
      <nav className="top-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/books">Reading Log</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
        <NavLink to="/reviews">Reviews</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/favorites">Favorite</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Book />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/:id" element={<ReviewDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/login" element={<SignIn setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;