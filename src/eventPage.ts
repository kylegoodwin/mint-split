import Papa from 'papaparse';
import Transaction from './Transaction';
import {DateTime, DateTimeFormatOptions, DateTimeOptions} from 'luxon';
import MessageType from './MessageType';




interface RawTable{
        date: string,
        description: string,
        originalDescription: string,
        amount: string,
        transactionType: string,
        category: string,
        accountName: string
}

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.type === "test-download") {
        executeDownload();
    }

    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.popupMounted) {
        console.log('eventPage notified that Popup.tsx has mounted.');
    }


    return isResponseAsync;
});


chrome.downloads.onCreated.addListener(handleNewDownload);

function handleNewDownload(item: chrome.downloads.DownloadItem) {
    console.log(item);
}


//Intercept a finished download 
chrome.downloads.onChanged.addListener(handleDownloadsChange)

function handleDownloadsChange(event: chrome.downloads.DownloadDelta): void {

    console.log(event);
    if (event.state?.current === "complete") {
        console.log("Download has finished");
        console.log(event);

        const query: chrome.downloads.DownloadQuery = { id: event.id }

        let item: chrome.downloads.DownloadItem | null = null;
        chrome.downloads.search(query, (items: chrome.downloads.DownloadItem[]) => {
            item = getSingleItemFromSearch(items)
        });

        console.log(item);
    }
}

function getSingleItemFromSearch(items: chrome.downloads.DownloadItem[]): chrome.downloads.DownloadItem | null {
    console.log(items[0]);
    return items[0] ? items[0] : null
}

function executeDownload(): void {

    chrome.runtime.sendMessage({type: MessageType.TransactionsLoading})

    Papa.parse<Transaction>("https://mint.intuit.com/transactionDownload.event?queryNew=&offset=0&filterType=cash&comparableType=8", {
        download: true,
        header: true,
        transformHeader:fixKey,
        complete: function (results) {
           
            const transactions = results.data.filter(value => {
                return (DateTime.fromFormat(value.date ,"M/dd/yyyy").startOf('day').diffNow('days').days * -1) < 60;
            })


            chrome.storage.local.set({transactionTable: transactions});
            chrome.runtime.sendMessage({type: MessageType.TransactionsLoaded})
        }
    });
}

function fixKey(str: string): string {
    return (str.charAt(0).toLowerCase() + str.slice(1)).replace(/ /g,'');
}
