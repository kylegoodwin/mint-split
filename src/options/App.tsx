import React, { useEffect,useState } from "react";
import Transaction from "../types/Transaction";
import TransactionsTable from '../components/Table';

const App = () : JSX.Element => {

    const [transactions,setTransactions] = useState<Transaction[]>([]);

    useEffect(()=>{
        chrome.storage.local.get(['transactionTable'], function(result) {
            setTransactions(result.transactionTable.map((each : Transaction,index : number) => {
                return { ...each, id: index}
            }));
          });
    },[])

  return (<div>
      {transactions.length > 0 && <TransactionsTable rows={transactions} />}
    </div>)
  }

  export default App;
