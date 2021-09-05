console.log("Extension running!")

chrome.runtime.onMessage.addListener(msgObj => {
   console.log(msgObj);
});

// chrome.downloads.onChanged.addListener(handleDownloadsChange)

// function handleDownloadsChange(event: chrome.downloads.DownloadDelta):void{
//   console.log(event);
// }


// const elements = document.querySelector('[aria-label=" Transaction activity"]');
// console.log(elements);