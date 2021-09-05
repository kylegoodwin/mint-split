import React, { useEffect } from "react";
import "./Popup.scss";

const Popup = () : JSX.Element => {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  const runScript = () => {
 }

  return (<div className="popupContainer">
      Chase Scrape Extension
      <button onClick={runScript}>
        Highlight Items Here
      </button>
      <button onClick={() => { chrome.runtime.sendMessage({ type: "test-download" }) }}>
        Try Download
      </button>
      <button onClick={() => { chrome.runtime.openOptionsPage(); }}>
        Extension Page
      </button>
    </div>)
  }

  export default Popup;
