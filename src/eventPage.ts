import executeDownload from './utility/download-transactions'

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.type === "test-download") {
        executeDownload();
    }

    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    return isResponseAsync;
});
