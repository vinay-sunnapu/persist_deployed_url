import React, { useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const STORAGE_KEY = "fieldnotes:notes";
const colors = ["green", "gold", "rose"];
const emptyDraft = { title: "", body: "" };

function Notes() {
  const [notes, setNotes, storageError] = useLocalStorage(STORAGE_KEY, []);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [draft, setDraft] = useState(null);
  const [formError, setFormError] = useState("");
  const savedNotes = useMemo(
    () => (Array.isArray(notes) ? notes : []),
    [notes]
  );

  const visibleNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return savedNotes
      .filter((note) => filter !== "pinned" || note.pinned)
      .filter((note) =>
        `${note.title} ${note.body}`.toLowerCase().includes(normalizedQuery)
      )
      .sort((first, second) => Number(second.pinned) - Number(first.pinned));
  }, [filter, savedNotes, query]);

  const saveNote = (event) => {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) {
      setFormError("Give your note a title before saving.");
      return;
    }

    const note = {
      ...draft,
      title,
      body: draft.body.trim(),
      updatedAt: new Date().toISOString()
    };
    const saved = setNotes((current) => {
      const safeNotes = Array.isArray(current) ? current : [];
      return (
        draft.id
          ? safeNotes.map((item) => (item.id === draft.id ? note : item))
          : [
              {
                ...note,
                id: `${Date.now()}-${Math.random()}`,
                pinned: false
              },
              ...safeNotes
            ]
      );
    });
    if (saved) {
      setDraft(null);
      setFormError("");
    }
  };

  const togglePinned = (id) => {
    setNotes((current) =>
      (Array.isArray(current) ? current : []).map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((current) =>
      (Array.isArray(current) ? current : []).filter((note) => note.id !== id)
    );
  };

  return (
    <section>
      <div className="page-header">
        <div className="eyebrow"><span className="eyebrow-mark">✳</span> YOUR SPACE</div>
        <h1 className="page-title">A place for <em>your thoughts.</em></h1>
        <p className="page-lede">Capture the little things. Your notes are saved right here on this device, ready whenever you are.</p>
      </div>

      {storageError && <div className="storage-message" role="alert">{storageError}</div>}

      {draft ? (
        <form className="form-card form-grid" onSubmit={saveNote}>
          <div className="section-heading">
            <h2>{draft.id ? "Edit note" : "A new note"}</h2>
            <button className="icon-button" onClick={() => setDraft(null)} type="button" aria-label="Close editor">×</button>
          </div>
          <label className="form-label">
            Note title
            <input
              autoFocus
              className="form-control"
              maxLength={80}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              placeholder="A thought worth keeping..."
              value={draft.title}
            />
          </label>
          <label className="form-label">
            Your note
            <textarea
              className="form-control"
              maxLength={2000}
              onChange={(event) => setDraft({ ...draft, body: event.target.value })}
              placeholder="Write anything. It stays on this device."
              value={draft.body}
            />
          </label>
          {formError && <div className="storage-message" role="alert">{formError}</div>}
          <div className="form-actions">
            <button className="button button-secondary" onClick={() => setDraft(null)} type="button">Cancel</button>
            <button className="button button-primary" type="submit">Save note <span aria-hidden="true">↗</span></button>
          </div>
        </form>
      ) : (
        <>
          <div className="notes-toolbar">
            <label className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="Search notes"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a note..."
                type="search"
                value={query}
              />
            </label>
            <button className="button button-primary" onClick={() => { setDraft(emptyDraft); setFormError(""); }} type="button">
              <span aria-hidden="true">＋</span> New note
            </button>
          </div>
          <div className="filter-tabs" aria-label="Filter notes">
            {[
              { id: "all", label: `All notes · ${savedNotes.length}` },
              { id: "pinned", label: `Pinned · ${savedNotes.filter((note) => note.pinned).length}` }
            ].map((tab) => (
              <button
                aria-pressed={filter === tab.id}
                className={`filter-tab${filter === tab.id ? " active" : ""}`}
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="notes-grid">
            {visibleNotes.length ? visibleNotes.map((note, index) => (
              <article className="note-card" key={note.id}>
                <div className="note-card-top">
                  <span className={`note-swatch ${colors[index % colors.length]}`} aria-hidden="true">✳</span>
                  <div className="note-actions">
                    <button
                      aria-label={note.pinned ? "Unpin note" : "Pin note"}
                      className={`icon-button${note.pinned ? " is-pinned" : ""}`}
                      onClick={() => togglePinned(note.id)}
                      title={note.pinned ? "Unpin note" : "Pin note"}
                      type="button"
                    >{note.pinned ? "★" : "☆"}</button>
                    <button aria-label={`Edit ${note.title}`} className="icon-button" onClick={() => { setDraft(note); setFormError(""); }} type="button">✎</button>
                    <button aria-label={`Delete ${note.title}`} className="icon-button" onClick={() => deleteNote(note.id)} type="button">×</button>
                  </div>
                </div>
                <h2>{note.title}</h2>
                <p>{note.body || "A little thought, kept safe."}</p>
                <footer><span>{note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : "Saved just now"}</span><span>{note.pinned ? "Pinned" : "On this device"}</span></footer>
              </article>
            )) : (
              <div className="empty-state">
                <div className="empty-state-mark" aria-hidden="true">✳</div>
                <h2>{query ? "No notes found" : filter === "pinned" ? "Nothing pinned yet" : "A fresh page"}</h2>
                <p>{query ? "Try another search, or start a new note." : filter === "pinned" ? "Pin a note to keep it close at hand." : "Your first thought is just a note away."}</p>
                {!query && filter === "all" && <button className="button button-secondary" onClick={() => setDraft(emptyDraft)} type="button">Write a note</button>}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Notes;
