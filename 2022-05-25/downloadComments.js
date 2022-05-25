
function downloadComments() {

    /**
     const header = document.querySelector("header");
     const body = document.querySelector("article");
  
     const post_author_name = header.querySelector("a").href;
     const post_author_URL = header.querySelector("a").text;
     const post_following_statue = header.querySelector("button").innerText
     const post_send_time = body.querySelector("div > div > div > div > div > a > time").getAttribute('title')
     const post_liked = body.querySelector("div > div > div > div > section > div > div > a > span").textContent
  
     //comments
     const c0 = body.querySelector("div > div > div > div > div > ul > div");
     const c1 = body.querySelector("div > div > div > div > div > ul > ul:nth-child(2)");
     const c2 = body.querySelector("div > div > div > div > div > ul > ul:nth-child(3)");
     const c3 = body.querySelector("div > div > div > div > div > ul > ul:nth-child(4)");
  
     //comment fields
     const tt = body.querySelector("div > div > div > div > div > ul > ul:nth-child(30)");
     tt_a = tt.querySelectorAll("a")
     tt_content = tt.innerText
     tt_author = tt_a[1]
     tt_hashAndAt = []
     tt_time = tt_a[tt_a.length - 1].querySelector("time").getAttribute('title')
     //tt_liked.textContent == Reply or ** liked
     tt_liked = tt.querySelectorAll("button")[0].textContent
  
     const tt_0 = body.querySelector("div > div > div > div > div > ul > ul:nth-child(30) > li > ul > div:nth-child(2) > li");
     tt_0_a = tt_0.querySelectorAll("a")
     tt_0_content = tt_0.innerText
     tt_0_author = tt_0_a[1]
     tt_0_hashAndAt = []
     tt_0_time = tt_0_a[tt_0_a.length - 1].querySelector("time").getAttribute('title')
     //tt_0_liked.textContent == Reply or ** liked
     likeStrs = tt_0.querySelectorAll("button")[0].textContent.split(" ")
     tt_0_liked = 0
     if (likeStrs.length === 2) {
      tt_0_liked = likeStrs[0]
  }
  
  
     //reply comments
     const c3_0 = body.querySelector("div > div > div > div > div > ul > ul:nth-child(4) > li > ul > div:nth-child(2) > li");
     const c3_1 = body.querySelector("div > div > div > div > div > ul > ul:nth-child(4) > li > ul > div:nth-child(3) > li");
  
     // ...
     const c112 = body.querySelector("div > div > div > div > div > ul > ul:nth-child(113)");
     const c112_a = c112.querySelectorAll("a")
     const c112_buttons = c112.querySelectorAll("button")
  
  
     **/
  
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
  
    function buildComment(CommentSelector) {
      const comment = document.querySelector(CommentSelector);
      if (comment === null) {
        return null
      }
      const comment_a = comment.querySelectorAll("a")
      const comment_content = comment.innerText
      const comment_author_name = comment_a[1].text
      const comment_author_url = comment_a[1].href
      const comment_hash = []
      const comment_at = []
      for (let j = 1; j < comment_a.length - 1; j++) {
        if (comment_a[j].text.startsWith("@")) {
          comment_at.push({
            url: comment_a[j].href,
            text: comment_a[j].text
          })
        } else if (comment_a[j].text.startsWith("#")) {
          comment_hash.push({
            url: comment_a[j].href,
            text: comment_a[j].text
          })
        }
      }
      const comment_time = comment_a[comment_a.length - 1].querySelector("time").getAttribute('title')
      //tt_liked.textContent == Reply or ** liked
      const likeStrs = comment.querySelectorAll("button")[0].textContent.split(" ")
      let comment_liked = 0
      if (likeStrs.length === 2) {
        comment_liked = likeStrs[0]
      }
      const result =  {
        'comment_content': comment_content,
        'comment_author_name': comment_author_name,
        'comment_author_url': comment_author_url,
        'comment_time': comment_time,
        'comment_liked': comment_liked,
        'comment_hash': comment_hash,
        'comment_At': comment_at
      }
      console.log("Building a comment: " + comment_author_url)
      return result
    }
  
    function buildPost() {
  
  
      //assert if the page has comments
      const header = document.querySelector("header");
      const body = document.querySelector("article");
  
      //find post properties
      const post_author_URL = header.querySelectorAll("a")[0] ? header.querySelectorAll("a")[0].href : header.querySelectorAll("a")[1].href;
      const post_author_name = header.querySelectorAll("a")[0] ? header.querySelectorAll("a")[0].text : header.querySelectorAll("a")[1].text;
      //const post_following_statue = header.querySelector("button").innerText
      //document.querySelector("section > main > div > div > article > div > div > div > div > div > a > time").getAttribute('title')
      //const post_send_time = document.querySelector("body > div > div > div > article > div > div > div > div > div > div > a > time").getAttribute('title')
      //const post_liked = body.querySelector("div > div > div > div > section > div > div > a > span").textContent
      //const post_content = body.querySelector("div > div > div > div > div > ul > div").textContent
  
      const result = {
        'post_author_name': post_author_name,
        'post_author_URL': post_author_URL//,
        // 'post_following_statue': post_following_statue,
        // 'post_send_time': post_send_time,
        // 'post_liked': post_liked,
        // 'post_content': post_content,
      }
      console.log("Building a post: " + post_author_URL)
      return result
    }
  
    function parsePostToJson() {
  
      let post = buildPost()
  
      const comments = []
      for (let i = 0; ; i++) {
        let commentSelector = `article > div > div > div > div > div > ul > ul:nth-child(${i + 2})`
        let commentObj = buildComment(commentSelector)
        if (commentObj === null) {
          break
        }
        comments.push(commentObj)
        for (let j = 0; ; j++) {
          let sub_commentSelector = `${commentSelector} > li > ul > div:nth-child(${j + 2}) > li`;
          let sub_commentObj = buildComment(sub_commentSelector)
          if (sub_commentObj === null) {
            break
          }
          comments.push(sub_commentObj)
        }
      }
  
      post['comments'] = comments
      return post
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
  
    const API = (function () {
      return {
        call: function (fn, params, callback) {
          chrome.runtime.sendMessage("empbkfnccnnjpelkombjdflmajdjeoic", {fn: fn, params: params},callback);
        }
      }
    })()
  
  
  
    let interval = null
    let loadCount = 0
    let tryCount = 3
    function iterateOverArray() {
      let more = document.querySelector('svg[aria-label="Load more comments"]')
      if(more === null && tryCount===0){
        clearInterval(interval);
        const html = document.querySelector("main").outerHTML
        const jsonResult = parsePostToJson(html)
  
        API.call("save",{key:"comments",value:JSON.stringify(jsonResult)},(response)=>{
          API.call("open",{url:jsonResult.post_author_URL},(response)=>{
            console.log(response)
          })
        })
  
        downloader(JSON.stringify(jsonResult), "application/json", "instagram_comments.json")
      }else if(more === null && tryCount!==0){
        console.clear()
        console.log(`simulated Click failed, try again`)
        tryCount--
      }else{
        tryCount = 3
        simulatedClick(document.querySelector('svg[aria-label="Load more comments"]'))
        console.clear()
        console.log(`Load more data${".".repeat(loadCount++)}`)
      }
    }
    interval = setInterval(iterateOverArray, 1000);
  
  
  // https://www.instagram.com/p/CYb78QHF1h-/
  
  
  }
  
  downloadComments()