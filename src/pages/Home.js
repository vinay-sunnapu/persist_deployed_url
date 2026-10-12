import React from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const STORAGE_KEY = "fieldnotes:notes";

function Home() {
  const [notes, , storageError] = useLocalStorage(STORAGE_KEY, []);
  const savedNotes = Array.isArray(notes) ? notes : [];
  const recentNotes = savedNotes.slice().sort(
    (first, second) => new Date(second.updatedAt) - new Date(first.updatedAt)
  ).slice(0, 3);

  return (
    <section>
      <div className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-mark">✳</span> A LITTLE SPACE OF YOUR OWN</div>
          <h1 className="page-title">Good things grow<br />when you <em>write them down.</em></h1>
          <p className="page-lede">A quiet corner for your ideas, plans, and passing thoughts. Yours to keep, with or without Wi-Fi.</p>
        </div>
        <div className="hero-illustration" aria-hidden="true">
          <span className="hero-sun" />
          <span className="hero-book">f.</span>
        </div>
      </div>

      {storageError && <div className="storage-message" role="alert">{storageError}</div>}

      <div className="section-heading"><h2>Your little corner</h2><Link className="text-link" to="/notes">See all notes <span aria-hidden="true">→</span></Link></div>
      <div className="stats-grid">
        <article className="stat-card">
          <div className="stat-topline"><span>Notes kept</span><span className="stat-icon" aria-hidden="true">▤</span></div>
          <div className="stat-value">{savedNotes.length}</div>
          <div className="stat-caption">Thoughts saved on this device</div>
        </article>
        <article className="stat-card">
          <div className="stat-topline"><span>Little stars</span><span className="stat-icon" aria-hidden="true">☆</span></div>
          <div className="stat-value">{savedNotes.filter((note) => note.pinned).length}</div>
          <div className="stat-caption">Notes you've pinned for later</div>
        </article>
        <article className="stat-card">
          <div className="stat-topline"><span>Your connection</span><span className="stat-icon" aria-hidden="true">◌</span></div>
          <div className="stat-value">On-device</div>
          <div className="stat-caption">Your notes never need a server</div>
        </article>
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-title"><h2>Recently on your mind</h2><span>{savedNotes.length ? `${savedNotes.length} saved` : "A fresh start"}</span></div>
          {recentNotes.length ? (
            <div className="note-list">
              {recentNotes.map((note, index) => (
                <Link className="note-preview" key={note.id} to="/notes">
                  <span className={`note-swatch ${["green", "gold", "rose"][index]}`} aria-hidden="true">✳</span>
                  <span className="note-preview-copy"><strong>{note.title}</strong><small>{note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : "Saved on this device"}</small></span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-small">You haven't saved a note yet. Every good idea has to start somewhere.</div>
          )}
          <Link className="text-link" to="/notes">{savedNotes.length ? "Open your notes →" : "Write your first note →"}</Link>
        </section>

        <section className="panel">
          <div className="panel-title"><h2>A few things to try</h2><span>All work offline</span></div>
          <Link className="quick-action" to="/notes">
            <span className="action-icon" aria-hidden="true">＋</span>
            <span><strong>Catch a thought</strong><small>Write and keep a little note</small></span>
            <span className="quick-arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="quick-action" to="/playground">
            <span className="action-icon" aria-hidden="true">✳</span>
            <span><strong>Try the offline lab</strong><small>Test what stays when Wi-Fi goes</small></span>
            <span className="quick-arrow" aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </section>
  );
}

export default Home;
