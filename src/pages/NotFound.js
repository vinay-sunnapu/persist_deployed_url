
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="route-empty">
      <div className="eyebrow">A LITTLE DETOUR</div>
      <h1>This page wandered off.</h1>
      <p className="page-lede">That address doesn't seem to belong to this little corner.</p>
      <Link className="button button-primary" to="/">Back to your space</Link>
    </div>
  );
}

export default NotFound;
