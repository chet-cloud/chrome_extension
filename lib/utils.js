/**
 * Ajax request
 * @param url
 * @param str
 * @returns {Promise<unknown>}
 * @constructor
 * Example
 *  PostData('//localhost:8080/msg', "jsonString").then(console.log);
 */
function PostData(url, str) {
    return new Promise((ok, error) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                ok(xhr.responseText);
            } else {
                error(xhr.status + ":" + xhr.statusText)
            }
        }
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send(str);
    })
}

// Load a script from given `url`
const loadScript = function (url) {
    return new Promise(function (resolve, reject) {
        const script = document.createElement('script');
        script.src = url;

        script.addEventListener('load', function () {
            // The script is loaded completely
            resolve(true);
        });

        document.head.appendChild(script);
    });
};
// Perform all promises in the order
const waterfall = function (promises) {
    return promises.reduce(
        function (p, c) {
            // Waiting for `p` completed
            return p.then(function () {
                // and then `c`
                return c().then(function (result) {
                    return true;
                });
            });
        },
        // The initial value passed to the reduce method
        Promise.resolve([])
    );
};

/**
 * load js files in github project
 * @param urls
 * @returns {Promise<unknown[]>}
 * @constructor
 */
function LoadScriptFromGithub(urls) {
    function GetData(url, str) {
        return new Promise((ok, error) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    ok(xhr.responseText);
                } else {
                    error(xhr.status + ":" + xhr.statusText)
                }
            }
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Content-Type', 'text/plain');
            xhr.send(str);
        })
    }

    const container = document.getElementsByTagName('head')[0]
    return Promise.all(urls.map(u => {
        return GetData(u).then((text) => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.innerHTML = text;
            return script
        })
    })).then(scripts => {
        scripts.map(s => {
            container.appendChild(s);
        })
    })
}

// Load an array of scripts in order
const loadScriptsInOrder = function (arrayOfJs) {
    const promises = arrayOfJs.map(function (url) {
        return loadScript(url);
    });
    return waterfall(promises);
};

// loadScript("https://raw.githubusercontent.com/chet-cloud/chet-cloud.github.io/main/lib/popup.js").then(()=>{
//     console.log("popup.js loaded")
// })


function CreateButton(text,fn){
    let container = document.getElementById("container");
    let button = document.createElement('button')
    button.textContent = text
    button.onclick = fn
    container.appendChild(button)
}

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

chrome.storage.sync.get("color", ({ color }) => {
  //changeColor.style.backgroundColor = color;
});


async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function executeScriptInTab(tabId,functionName){
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        function: functionName,
    });
}

async function executeScriptInCurrentTab(functionName){
    let tab = await getCurrentTab();
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: functionName,
    });
}


async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


function OpenUrl(url,fn){
    chrome.tabs.create({url:url},fn)
}

const Connect = chrome.runtime.connect({name: "knockknock"});
Connect.onMessage.addListener(function(msg) {
    console.log("Msg from background: ",tab)
});


async function RemoveTab(tab) {
    return await chrome.tabs.remove(tab.id);
}

chrome.tabs.onCreated.addListener((d)=>{
    console.log("tab created",d)
})

chrome.tabs.onRemoved.addListener((d)=>{
    console.log("tab onRemoved",d)
})

function WaitUntil(f, timeoutMs) {
    return new Promise((resolve, reject) => {
        let timeWas = new Date();
        let wait = setInterval(function() {
            if (f()) {
                console.log("resolved after", new Date() - timeWas, "ms");
                clearInterval(wait);
                resolve();
            } else if (new Date() - timeWas > timeoutMs) { // Timeout
                console.log("rejected after", new Date() - timeWas, "ms");
                clearInterval(wait);
                reject();
            }
        }, 20);
    });
}

