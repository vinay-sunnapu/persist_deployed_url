import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const STORAGE_KEY = "fieldnotes:messages";

function Contact() {
  const [messages, setMessages, storageError] = useLocalStorage(STORAGE_KEY, []);
  const savedMessages = Array.isArray(messages) ? messages : [];
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  const saveMessage = (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;

    const didSave = setMessages((current) => [
      { id: `${Date.now()}-${Math.random()}`, text, savedAt: new Date().toISOString() },
      ...(Array.isArray(current) ? current : [])
    ]);
    if (didSave) {
      setMessage("");
      setSaved(true);
    }
  };

  return (
    <section>
      <div className="page-header">
        <div className="eyebrow"><span className="eyebrow-mark">✳</span> A LITTLE NOTE</div>
        <h1 className="page-title">Say <em>hello.</em></h1>
        <p className="page-lede">Try the form—it saves your message right here in your browser. No email is sent, so you can test it without an internet connection.</p>
      </div>

      <div className="contact-layout">
        <form className="form-card form-grid" onSubmit={saveMessage}>
          <h2 className="panel-title" style={{ marginBottom: 0 }}>Leave yourself a note</h2>
          {storageError && <div className="storage-message" role="alert">{storageError}</div>}
          {saved && !storageError && <div className="storage-message success" role="status">Saved on this device. Nothing was sent over the internet.</div>}
          <label className="form-label">
            Your message
            <textarea
              className="form-control"
              maxLength={1000}
              onChange={(event) => { setMessage(event.target.value); setSaved(false); }}
              placeholder="A note, a thought, or just a hello..."
              required
              value={message}
            />
          </label>
          <div className="form-actions"><button className="button button-primary" type="submit">Save this note <span aria-hidden="true">↗</span></button></div>
          {savedMessages.length > 0 && (
            <div className="lab-callout">
              <strong>{savedMessages.length} {savedMessages.length === 1 ? "message" : "messages"} saved locally.</strong> They're only stored in this browser.
            </div>
          )}
        </form>
        <aside className="contact-side">
          <span className="contact-symbol" aria-hidden="true">✳</span>
          <h2>A friendly little experiment.</h2>
          <p>This form is here to test interactions while offline. It doesn't connect to a mail service or share your words. Try saving a message, then switch off Wi-Fi and try again.</p>
        </aside>
      </div>
    </section>
  );
}

export default Contact;
