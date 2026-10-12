import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const STORAGE_KEY = "fieldnotes:offline-lab";
const checklist = [
  "Open this app once while you're online",
  "Wait for the first page to finish loading",
  "Switch your device to airplane mode",
  "Refresh, then try another page and save a note"
];

function Playground() {
  const [lab, setLab, storageError] = useLocalStorage(STORAGE_KEY, {
    count: 0,
    checked: []
  });
  const savedLab = lab && typeof lab === "object" ? lab : { count: 0, checked: [] };
  const checkedItems = Array.isArray(savedLab.checked) ? savedLab.checked : [];
  const progress = Math.round((checkedItems.length / checklist.length) * 100);

  const toggleChecklist = (index) => {
    const checked = checkedItems.includes(index)
      ? checkedItems.filter((item) => item !== index)
      : [...checkedItems, index];
    setLab({ ...savedLab, checked });
  };

  return (
    <section>
      <div className="page-header">
        <div className="eyebrow"><span className="eyebrow-mark">✳</span> TRY IT FOR YOURSELF</div>
        <h1 className="page-title">The <em>offline lab.</em></h1>
        <p className="page-lede">Everything here runs in your browser. Give the buttons a try, then come back with your internet turned off.</p>
      </div>

      {storageError && <div className="storage-message" role="alert">{storageError}</div>}

      <div className="lab-grid">
        <article className="lab-card">
          <div className="eyebrow">A TINY EXPERIMENT</div>
          <h2>One more click?</h2>
          <p>Tap away. Your count stays saved, even if you close this tab.</p>
          <div className="counter-display" aria-live="polite">{savedLab.count || 0}</div>
          <div className="counter-controls">
            <button className="button button-secondary" onClick={() => setLab({ ...savedLab, count: Math.max(0, (savedLab.count || 0) - 1) })} type="button" aria-label="Decrease count">−</button>
            <button className="button button-primary" onClick={() => setLab({ ...savedLab, count: (savedLab.count || 0) + 1 })} type="button">Add a click <span aria-hidden="true">＋</span></button>
            <button className="button button-secondary" onClick={() => setLab({ ...savedLab, count: 0 })} type="button">Reset</button>
          </div>
          <div className="lab-callout">This little counter is <strong>saved in your browser</strong>—no server, no signal, no problem.</div>
        </article>

        <article className="lab-card">
          <div className="eyebrow">YOUR OFFLINE CHECKLIST</div>
          <h2>Ready when you are.</h2>
          <p>Tick each step as you test the app without a connection.</p>
          <div className="checklist">
            {checklist.map((item, index) => (
              <label className="check-row" key={item}>
                <input checked={checkedItems.includes(index)} onChange={() => toggleChecklist(index)} type="checkbox" />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <div className="progress-track" aria-label={`${progress}% complete`} role="progressbar" aria-valuemax={100} aria-valuemin={0} aria-valuenow={progress}>
            <div className="progress-value" style={{ width: `${progress}%` }} />
          </div>
          <div className="lab-callout"><strong>{progress}% complete.</strong> Your checklist is saved on this device, too.</div>
        </article>
      </div>
      <div className="about-callout"><strong>A note about going offline:</strong> the first visit needs an internet connection so your browser can download and cache the app. Once cached, come back to this URL on the same device and browser. Your notes and progress are stored only on this device.</div>
    </section>
  );
}

export default Playground;
