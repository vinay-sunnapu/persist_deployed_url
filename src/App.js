
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  const [isOnline, setIsOnline] = useState(
    navigator.onLine
  );

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener(
        "online",
        updateOnlineStatus
      );
      window.removeEventListener(
        "offline",
        updateOnlineStatus
      );
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h2>Persist Deployed URL</h2>

          <nav>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </header>

        <div className={
          isOnline ? "status online" : "status offline"
        }>
          {isOnline
            ? "Online Mode"
            : "Offline Mode - App Still Works"}
        </div>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/contact"
              element={<Contact />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
