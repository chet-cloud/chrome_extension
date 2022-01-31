console.log("from background.js")
// let color = '#3aa757';
//
// chrome.runtime.onInstalled.addListener(() => {
//   //console = chrome.extension.getBackgroundPage().console;
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });
const DB ={}
const functionObject = {
    hello: function () {
        return "world"
    },
    open:function(params){
        chrome.tabs.create({url:params['url']},()=>{})
    },
    save:function ({key,value}){
        DB[key] = value
    },
    get:function ({key}){
        return DB[key]
    },
    remove:function ({key}){
        return delete DB[key]
    }
}

chrome.runtime.onConnect.addListener(function (Connection) {
    console.assert(Connection.name === "knockknock");
    Connection.onMessage.addListener(function (msg) {
        try {
            let fn = functionObject[msg['fn']]
            if(fn instanceof Function){
                let params = msg['params']
                let result = fn(params)
                Connection.postMessage({index:msg['index'],data:result});
            }
        }catch (e) {

        }
    });
});




/**

 // send message in web page and need to config externally_connectable in manifest.json
 const API = (function () {
    return {
        call: function (fn, params, callback) {
            chrome.runtime.sendMessage("empbkfnccnnjpelkombjdflmajdjeoic", {fn: fn, params: params},callback);
        }
    }
 })()

 API.call("hello",{},(response)=>{
    console.log(response)
 })

 */
chrome.runtime.onMessageExternal.addListener(
    function (msg, sender, sendResponse) {
        try {
            let fn = functionObject[msg['fn']]
            if(fn instanceof Function){
                let params = msg['params']
                let result = fn(params)
                console.log(result)
                sendResponse(result)
            }
        }catch (e) {
            console.error(e)
        }
    });


chrome.tabs.onCreated.addListener((d) => {
    console.log("tab created", d)
})



