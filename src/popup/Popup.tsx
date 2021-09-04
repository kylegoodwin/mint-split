import React, { useEffect } from "react";
import "./Popup.scss";

const Popup: React.FC = ({}) => {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  const runScript = () => {
    // console.log("Running")
    // const elements = document.querySelector('[aria-label=" Transaction activity"]');
    // console.log(elements);
    const message = { type: "CHECK_TABLE"};
    chrome.runtime.sendMessage(message);
  }
  

  return <div className="popupContainer">
   Chase Scrape Extension
   <button onClick={runScript}>
     Highlight Items Here
   </button>
    </div>;
}

export default Popup;
