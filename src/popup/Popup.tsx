import React, { useEffect, useState } from "react";
import "./Popup.scss";
import Message from "../types/Message";
import MessageType from "../types/MessageType";

const Popup = (): JSX.Element => {

  const [loadingTransactions, setLoadingTransactions] = useState<boolean>(false);

  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });

    chrome.runtime.onMessage.addListener(handleMessage)

  }, []);

  const handleMessage = (message : Message) => {
      if(message.type === MessageType.TransactionsLoading){
        setLoadingTransactions(true);
      }else if(message.type === MessageType.TransactionsLoaded){
        setLoadingTransactions(false);
      }
  }

  return (<div className="popupContainer">
    {loadingTransactions && <p>Transactions Loading</p>}
    Processs mint transations
    <a target="blank" href="https://accounts.intuit.com/index.html">Open Mint to start download </a>
    <button onClick={() => { chrome.runtime.sendMessage({ type: "test-download" }) }}>
      Try Download
    </button>
    <button onClick={() => { chrome.runtime.openOptionsPage(); }}>
      Extension Page
    </button>
  </div>)
}

export default Popup;
