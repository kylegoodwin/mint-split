import Papa from 'papaparse';
import Transaction from '../types/Transaction';
import {DateTime} from 'luxon';
import MessageType from '../types/MessageType';
import RawTable from '../types/RawTable';

export default function executeDownload(): void {

    chrome.runtime.sendMessage({type: MessageType.TransactionsLoading})

    Papa.parse<RawTable>("https://mint.intuit.com/transactionDownload.event?queryNew=&offset=0&filterType=cash&comparableType=8", {
        download: true,
        header: true,
        transformHeader: fixKey,
        complete: function (results) {
           
            //Stop filtering the list
            //filter(value => {return (DateTime.fromFormat(value.date ,"M/dd/yyyy").startOf('day').diffNow('days').days * -1) < 60;})
            let transactions: Transaction[] = results.data.map( (rawTransaction,i) => { 
                return {...rawTransaction, amount: parseFloat(rawTransaction.amount)* (rawTransaction.transactionType === "debit" ? 1 : -1), index: results.data.length - i} as Transaction
            })
            chrome.storage.local.set({transactionTable: transactions});
            chrome.runtime.sendMessage({type: MessageType.TransactionsLoaded})
        }
    });
}

function fixKey(str: string): string {
    return (str.charAt(0).toLowerCase() + str.slice(1)).replace(/ /g,'');
}