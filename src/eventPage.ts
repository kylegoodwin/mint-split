import Papa from 'papaparse';
import Transaction from './models/Transaction';
import {DateTime} from 'luxon';
import MessageType from './MessageType';
import RawTable from './models/RawTable';

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.type === "test-download") {
        executeDownload();
    }

    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    return isResponseAsync;
});

function executeDownload(): void {

    chrome.runtime.sendMessage({type: MessageType.TransactionsLoading})

    Papa.parse<RawTable>("https://mint.intuit.com/transactionDownload.event?queryNew=&offset=0&filterType=cash&comparableType=8", {
        download: true,
        header: true,
        transformHeader:fixKey,
        complete: function (results) {
           
            const transactions: Transaction[] = results.data.filter(value => {
                return (DateTime.fromFormat(value.date ,"M/dd/yyyy").startOf('day').diffNow('days').days * -1) < 60;
            }).map( rawTransaction => { 
                return {...rawTransaction, amount: parseFloat(rawTransaction.amount)* (rawTransaction.transactionType === "debit" ? 1 : -1)} as Transaction
            })

            chrome.storage.local.set({transactionTable: transactions});
            chrome.runtime.sendMessage({type: MessageType.TransactionsLoaded})
        }
    });
}

function fixKey(str: string): string {
    return (str.charAt(0).toLowerCase() + str.slice(1)).replace(/ /g,'');
}
