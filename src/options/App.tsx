import React, { useEffect,useState } from "react";
import Transaction from "../Transaction";
import TransactionsTable from './Table';

const App = () : JSX.Element => {

    const [transactions,setTransactions] = useState<Transaction[]>([]);

    useEffect(()=>{
        chrome.storage.local.get(['transactionTable'], function(result) {
            // console.log(result);
            setTransactions(result.transactionTable.map((each : Transaction,index : number) => {
                return { ...each, id: index}
            }));
          });
    },[])

  return (<div>
      <h1>Transaction Table</h1>
      {transactions.length > 0 && <TransactionsTable rows={transactions} />}
    </div>)
  }

  export default App;
