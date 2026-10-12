import React from "react";

function About() {
  return (
    <section>
      <div className="page-header">
        <div className="eyebrow"><span className="eyebrow-mark">✳</span> A SMALL INTRODUCTION</div>
        <h1 className="page-title">Made for <em>real life.</em></h1>
        <p className="page-lede">Fieldnotes is a tiny demo of a bigger idea: the things you make in the browser can still be there when your connection isn't.</p>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <span aria-hidden="true">▤</span>
          <h2>A spot for your thoughts</h2>
          <p>Write, find, edit, pin, and remove notes. Your notes live in this browser's local storage and stay on this device.</p>
        </article>
        <article className="about-card">
          <span aria-hidden="true">◌</span>
          <h2>Here when you're offline</h2>
          <p>The production build caches the app shell. Once it's been loaded online, revisit the same address in this browser without a connection.</p>
        </article>
        <article className="about-card">
          <span aria-hidden="true">✳</span>
          <h2>Just a friendly demo</h2>
          <p>No accounts, no server, and no real message sending. Clear this browser's site data and its locally saved notes will be removed.</p>
        </article>
      </div>

      <div className="about-callout">
        <strong>First time here?</strong> Open the deployed app while online and wait for it to finish loading so its service worker can cache the files. Offline availability depends on your browser and a secure deployment (HTTPS, or localhost). If the deployment URL or browser storage is different, the app will need to be visited online again.
      </div>
    </section>
  );
}

export default About;
