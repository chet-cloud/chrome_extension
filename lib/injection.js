console.log("injection.js")


// let send = XMLHttpRequest.prototype.send;
// XMLHttpRequest.prototype.send = function () {
//     console.log("cccccc")
//     send.apply(this, arguments);
// }
//
// let my_fetch = fetch;
// window.fetch = function () {
//     console.log("fetch")
//     my_fetch.apply(this, arguments);
// }
//
// debugger
//
// let send = XMLHttpRequest.prototype.send;
// XMLHttpRequest.prototype.send = function (t) {
//     console.log("cc")
//     var e = this, n = s(t);
//     return n && e.addEventListener("loadend", function () {
//         c({requestID: n, statusCode: e.status})
//     }), o.apply(e, arguments)
// }
//
// e.addEventListener("loadend", function () {
//     console.log("cc")
// })
//
// e.addEventListener('readystatechange', function () {
//     if (this.readyState === 4) {
//         console.log(this);
//     }
// }, false);


const origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function () {
    window.console.log('request started!');
    this.addEventListener('load', function () {
        window.console.log('request completed!');
        window.console.log(this.readyState); //will always be 4 (ajax is completed successfully)
        window.console.log(this.responseText); //whatever the response was
    });
    origOpen.apply(this, arguments);
};


document.addEventListener('DOMContentLoaded', (event) => {
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
    Intercept("/",(d)=>{
        console.log(d)
    })
})


var actualCode = `// Code here.
// If you want to use a variable, use $ and curly braces.
// For example, to use a fixed random number:
var someFixedRandomValue = ${ Math.random() };
// NOTE: Do not insert unsafe variables in this way, see below
// at "Dynamic values in the injected code"
`;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();



var actualCode = '// Some code example \n' +
    'console.log(document.documentElement.outerHTML);';

document.documentElement.setAttribute('onreset', actualCode);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');



location.href = "javascript: console.log('yeah')"