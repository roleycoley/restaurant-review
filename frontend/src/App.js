import { Link, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import React, { useState } from "react";

import Home from "./components/home-page";
import AddReview from "./components/restaurant-review-page";
import Restaurant from "./components/restaurant-page";
import RestaurantsList from "./components/restaurants-list-page";
import Login from "./components/login-page";

function App() {
  const [user, setUser] = useState(null);

  // default set to null
  async function login(user) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <>
      <div className="navbar">
        <div className="navbar-sections">
          <Link to="/restaurants" className="nav-link">
            <button>Search</button>
          </Link>

          <Link to="/">
            <button style={{ fontSize: "35px" }}>Home</button>
          </Link>
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/login" className="nav-link">
              <button>Login</button>
            </Link>
          )}

          {user && <div className="username"> User: {user.name} </div>}
        </div>
      </div>
      <Routes>
        <Route path="/restaurants" element={<RestaurantsList />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/restaurants/:id" element={<Restaurant user={user} />} />
        <Route
          path="/restaurants/:id/review"
          element={<AddReview user={user} />}
        />
      </Routes>
    </>
  );
}

export default App;
