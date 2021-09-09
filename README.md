## Work in progress
Building a chrome extension to automate the manual labor I have been doing to split expenses with my partner. Requires you to log in to Mint.com and have it tracking your various accounts. The goal is to have a table where you can just select the transactions you would like to split with a checkbox, and have this extension output a split total with a breakdown as a table.

TODO:
[x] Pull data from mint.com
[x] Display all transactions on a table
[ ] Allow transactions to be selected
[ ] Do math to split the tab
[ ] Exportable receipt of split transactions
[ ] Keep track of last transaction so you know where to start for the next tab

Future Ideas:
[ ] Paste output straight into google doc using Google Drive API

Starter code grabbed from here https://github.com/martellaj/chrome-extension-react-typescript-boilerplate

## Building

1.  Clone repo
2.  `npm i`
3.  `npm run dev` to compile once or `npm run watch` to run the dev task in watch mode
4.  `npm run build` to build a production (minified) version

## Installation

1.  Complete the steps to build the project above
2.  Go to [_chrome://extensions_](chrome://extensions) in Google Chrome
3.  With the developer mode checkbox ticked, click **Load unpacked extension...** and select the _dist_ folder from this repo
