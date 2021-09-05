import React, { useEffect,useState } from "react";
import Transaction from "../Transaction";

const App = () : JSX.Element => {

    const [transactions,setTransactions] = useState<Transaction[]>([]);

    useEffect(()=>{
        chrome.storage.local.get(['transactionTable'], function(result) {
            // console.log(result);
            setTransactions(result.transactionTable);
          });
    },[])

  return (<div>
      <h1> App goes here</h1>
      <p>{transactions.length}</p>
    </div>)
  }

  export default App;
