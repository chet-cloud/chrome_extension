let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  console = chrome.extension.getBackgroundPage().console;
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});


// this is the background code...

// listen for our browerAction to be clicked
// chrome.browserAction.onClicked.addListener(function (tab) {
// 	// for the current tab, inject the "inject.js" file & execute it
// 	chrome.tabs.executeScript(tab.ib, {
// 		file: 'inject.js'
// 	});
// });