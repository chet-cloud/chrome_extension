

CreateButton("Download instagram followers",async () => {
    let tab = await getCurrentTab()
    if(tab.url.startsWith("https://www.instagram.com/p/")){
        OpenUrl("https://www.instagram.com/chet_hub/",async function (tab) {
            console.log(tab)
        })
    }else{
        executeScriptInCurrentTab(error)
    }
})

function error() {
    console.log("Please click when your URL of current tab is https://www.instagram.com/p/")
}

function download() {

    function Intercept(urlmatch, callback){
        let send = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function() {
            this.addEventListener('readystatechange', function() {
                if (this.responseURL.includes(urlmatch) && this.readyState === 4) {
                    callback(this);
                }
            }, false);
            send.apply(this, arguments);
        };
    };

    //downloader(JSON.stringify(jsonResult), "application/json", "instagram_comments.json")
    function downloader(data, type, name) {
        function downloadURI(uri, name) {
            let link = document.createElement("a");
            link.download = name;
            link.href = uri;
            link.click();
        }

        let blob = new Blob([data], {type});
        let url = window.URL.createObjectURL(blob);
        downloadURI(url, name);
        window.URL.revokeObjectURL(url);
        console.log(`Download the data as a file: ${name}`)
    }

    function simulatedClick(target, options) {

        var event = target.ownerDocument.createEvent('MouseEvents'),
            options = options || {},
            opts = { // These are the default values, set up for un-modified left clicks
                type: 'click',
                canBubble: true,
                cancelable: true,
                view: target.ownerDocument.defaultView,
                detail: 1,
                screenX: 0, //The coordinates within the entire page
                screenY: 0,
                clientX: 0, //The coordinates within the viewport
                clientY: 0,
                ctrlKey: false,
                altKey: false,
                shiftKey: false,
                metaKey: false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
                button: 0, //0 = left, 1 = middle, 2 = right
                relatedTarget: null,
            };

        //Merge the options with the defaults
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                opts[key] = options[key];
            }
        }

        //Pass in the options
        event.initMouseEvent(
            opts.type,
            opts.canBubble,
            opts.cancelable,
            opts.view,
            opts.detail,
            opts.screenX,
            opts.screenY,
            opts.clientX,
            opts.clientY,
            opts.ctrlKey,
            opts.altKey,
            opts.shiftKey,
            opts.metaKey,
            opts.button,
            opts.relatedTarget
        );

        //Fire the event
        target.dispatchEvent(event);
    }

    window.onload = function (){
        console.log("run ...")
    }
}


//var port = chrome.runtime.connect({name: "knockknock"});
// port.postMessage({joke: "Knock knock"});
// port.onMessage.addListener(function(msg) {
//   console.log("from popup",msg)
//   if (msg.question === "Who's there?")
//     port.postMessage({answer: "Madame"});
//   else if (msg.question === "Madame who?")
//     port.postMessage({answer: "Madame... Bovary"});
// });


