// let color = '#3aa757';
//
// chrome.runtime.onInstalled.addListener(() => {
//   //console = chrome.extension.getBackgroundPage().console;
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });
//
// console.log("from background.js")

chrome.runtime.onConnect.addListener(function(Connection) {
  console.assert(Connection.name === "knockknock");
  // Connection.onMessage.addListener(function(msg) {
  //   console.log("from background",msg)
  //   if (msg.joke === "Knock knock")
  //     Connection.postMessage({question: "Who's there?"});
  //   else if (msg.answer === "Madame")
  //     Connection.postMessage({question: "Madame who?"});
  //   else if (msg.answer === "Madame... Bovary")
  //     Connection.postMessage({question: "I don't get it."});
  // });
  chrome.tabs.onCreated.addListener((d)=>{
    console.log("tab created",d)
    Connection.postMessage(d);
  })
});

chrome.webRequest.onCompleted.addListener(
    function(data) {
      console.log(data)
    },
    {urls: ["https://i.instagram.com/api/v1/friendships/16627465258/*"]}
);