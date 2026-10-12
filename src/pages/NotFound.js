
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page">
      <h1>404 - Page Not Found</h1>
      <p>The requested route does not exist.</p>
      <Link to="/">Return Home</Link>
    </div>
  );
}

export default NotFound;
