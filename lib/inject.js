console.log("inject")

var headers = document.querySelectorAll('p');

headers.length;


let send = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function () {
    console.log("cccccc")
    send.apply(this, arguments);
}



e(XMLHttpRequest.prototype.send, (o = XMLHttpRequest.prototype.send,
        function (t) {
            var e = this
                , n = s(t);
            return n && e.addEventListener("loadend", function () {
                c({
                    requestID: n,
                    statusCode: e.status
                })
            }),
                o.apply(e, arguments)
        }
))