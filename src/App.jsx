import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CrewDetail from "./pages/CrewDetail";
import Gallery from "./pages/Gallery";
import CreateCrewMate from "./pages/CreateCrewMate";
import EditCrewMate from "./pages/EditCrewMate";
import Spaceship from "./assets/spaceship.png";
import Crew from "./assets/crew.png";
import Peek from "./assets/peeking.7c0ab599.png";

export const App = () => {
  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-content">
          <ul className="nav-menu">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/create" className="nav-link">
                Create Crewmate
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="nav-link">
                Gallery
              </Link>
            </li>
          </ul>
          <div className="sidebar-image">
            <img src={Peek} alt="Peeking character" />
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home">
                <h1>Welcome to Crewmate Creator!</h1>
                <p>Create and manage your crew of amazing crewmates</p>
                <div className="home-images">
                  <img src={Crew} alt="Crew" className="home-image" />
                  <img src={Spaceship} alt="Spaceship" className="home-image" />
                </div>
              </div>
            }
          ></Route>
          <Route path="/create" element={<CreateCrewMate />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/crewmate/:id" element={<CrewDetail />} />
          <Route path="/edit/:id" element={<EditCrewMate />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
