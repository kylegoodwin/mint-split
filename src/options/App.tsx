// @ts-nocheck

import React, { useEffect, useState } from "react";
import Transaction from "../types/Transaction";
import TransactionsTable from '../components/Table';
import { Box } from "@material-ui/core";

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const App = (): JSX.Element => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    chrome.storage.local.get(['transactionTable'], function (result) {
      if (result && result.transactionTable) {
        setTransactions(result.transactionTable);
      }
    });
  }, [])

  return (<ErrorBoundary>
    <Box style={{boxSizing: "border-box"}} padding="1em">{transactions.length > 0 && <TransactionsTable rows={transactions} />}</Box>
  </ErrorBoundary>
  )
}

export default App;
