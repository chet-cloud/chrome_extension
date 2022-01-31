// CreateButton("Go to profile page and click to download followers", async () => {
//     let tab = await getCurrentTab()
//     chrome.scripting.executeScript({
//         target: {tabId: tab.id, allFrames: true},
//         files: ['lib/inject_followers.js']
//     }, (injectionResults) => {
//         for (const frameResult of injectionResults)
//             console.log('Frame Title: ' + frameResult.result);
//     });
// })
