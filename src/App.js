import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes
} from "react-router-dom";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import Playground from "./pages/Playground";
import "./App.css";

const navigation = [
  { to: "/", label: "Overview", icon: "⌂", end: true },
  { to: "/notes", label: "My notes", icon: "▤" },
  { to: "/playground", label: "Offline lab", icon: "✳" }
];

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true
      }}
    >
      <div className="app-shell">
        <aside className="sidebar">
          <NavLink className="brand" to="/" aria-label="Fieldnotes home">
            <span className="brand-mark">f.</span>
            <span>fieldnotes<span className="brand-period">.</span></span>
          </NavLink>

          <p className="nav-caption">YOUR SPACE</p>
          <nav className="primary-nav" aria-label="Main navigation">
            {navigation.map(({ to, label, icon, end }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-item${isActive ? " active" : ""}`
                }
                end={end}
                key={to}
                to={to}
              >
                <span className="nav-icon" aria-hidden="true">{icon}</span>
                {label}
              </NavLink>
            ))}
            <NavLink className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} to="/about">
              <span className="nav-icon" aria-hidden="true">◉</span>
              About
            </NavLink>
            <NavLink className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} to="/contact">
              <span className="nav-icon" aria-hidden="true">↗</span>
              Say hello
            </NavLink>
          </nav>

          <div className="sidebar-note">
            <span className="sidebar-note-icon">✦</span>
            <strong>Your space, anywhere.</strong>
            <p>Your notes stay on this device—even when the internet doesn’t.</p>
          </div>
          <div className="profile">
            <span className="avatar">Y</span>
            <span><strong>Your workspace</strong><small>Personal space</small></span>
            <span className="profile-menu" aria-hidden="true">···</span>
          </div>
        </aside>

        <div className="main-column">
          <header className="topbar">
            <span className="breadcrumb">Your workspace <span>/</span> <strong>Personal</strong></span>
            <div className={`connection-pill ${isOnline ? "connected" : "disconnected"}`} role="status">
              <span className="connection-dot" />
              {isOnline ? "Online" : "Offline mode"}
            </div>
          </header>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="site-footer">
            <span>Made for the connected moments <span aria-hidden="true">and</span> the quiet ones.</span>
            <span><span className="footer-dot" /> Your work is saved on this device</span>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
