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
import Favorites from "./components/Favorites";
import { CheckSession } from "./services/Auth";

const App = () => {
  const [user, setUser] = useState(null);
  console.log(user)
  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const handleLogin =  (userData) => {
    setUser(userData);
  }

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
  };

  useEffect(() => {
    checkToken(); // Call checkToken on mount to ensure user session is checked
  }, []);

  return (
    <BrowserRouter>
    <nav className="top-nav">
      <NavLink to="/">Home</NavLink>
      {user ? ( // Check if user is logged in
        <>
          <NavLink to="/books">Reading Log</NavLink>
          <NavLink to="/wishlist">Wishlist</NavLink>
          <NavLink to="/reviews">Reviews</NavLink>
          <NavLink to="/favorites">Favorite</NavLink>
          <NavLink onClick={handleLogOut} to="/">Sign Out</NavLink>
        </>
      ) : ( // Render these links if user is logged out
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Book user={user} />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/reviews/:id" element={<ReviewDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SignIn handleLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;