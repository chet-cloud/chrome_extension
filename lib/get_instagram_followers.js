function Intercept(urlmatch, callback) {
    let send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('readystatechange', function () {
            if (this.responseURL.includes(urlmatch) && this.readyState === 4) {
                callback(this);
            }
        }, false);
        send.apply(this, arguments);
    };
};

function WaitUntil(f, timeoutMs) {
    return new Promise((resolve, reject) => {
        let timeWas = new Date();
        let wait = setInterval(function () {
            if (f()) {
                console.log("resolved after", new Date() - timeWas, "ms");
                clearInterval(wait);
                resolve();
            } else if (new Date() - timeWas > timeoutMs) { // Timeout
                console.log("rejected after", new Date() - timeWas, "ms");
                clearInterval(wait);
                reject();
            }
        }, 1000);
    });
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

function getElWith(select, fn) {
    let result = []
    const allA = document.querySelectorAll(select)
    for (let i = 0; i < allA.length; i++) {
        let a = allA[i]
        if (fn(a)) {
            result.push(a)
        }
    }
    return result
}

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

function getFollowersEl() {
    let result = null
    const allA = document.querySelectorAll("a")
    for (let i = 0; i < allA.length; i++) {
        let a = allA[i]
        if (a.childElementCount === 1 && a.textContent.endsWith("followers")) {
            result = a
            break
        }
    }
    if (result === null) {
        console.log("can't find followers")
    }
    return result
}


WaitUntil(() => document.body !== null, 1000 * 10).then(() => {
    //document.body.style.width = '200px';
})

function getFollowersNames(){
    if(document.querySelector("body > div > div > div > div > div > ul > div") == null){
        return []
    }
    let a = document.querySelector("body > div > div > div > div > div > ul > div").querySelectorAll("a")
    if( a === null){
        return []
    }
    let all = Array.from(a)
    let result = all.filter((a)=>a.text!=="")
    return result.map((a)=>{
        return a.text
    })
}

WaitUntil(() => getFollowersEl() !== null, 1000 * 60).then(() => {
    let clickTarget = getFollowersEl()
    let followerNumber = clickTarget.querySelector("span").textContent
    followerNumber = parseInt(followerNumber.replaceAll(",",""))
    simulatedClick(clickTarget)
    WaitUntil(() => {
        const len = getFollowersNames().length
        console.log("getFollowersNames:" + len)
        return len === followerNumber
    }, 1000 * 6000000000).then(() => {
        let followersNames = getFollowersNames()
        console.log(followersNames)
        // API.call("get",{key:"comments"},(response)=>{
        //     console.log(response)
        // })
        downloader(JSON.stringify(followersNames), "application/json", "instagram_followers.json")
    })
})