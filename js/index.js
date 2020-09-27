gso = {};
ggo = {};

ggo.loadSingleComplete = function () {
    ggo.s.parentNode.removeChild(ggo.s);
    ggo.s.removeEventListener("load", ggo.loadSingleComplete, false);
    if (typeof ggo._callback === "function") {
        var tmp = ggo._callback;
        ggo._callback = null;
        tmp();
    }
};

ggo.loadSingleScript = function (src, callback) {
    ggo._callback = callback;
    ggo.s = document.createElement("script");
    ggo.s.async = false;
    ggo.s.src = src;
    ggo.s.addEventListener("load", ggo.loadSingleComplete, false);
    document.body.appendChild(ggo.s);
};

ggo.readParams = function () {
    if (location.search.length > 1) {
        for (var aItKey, nKeyId = 0, aCouples = location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
            aItKey = aCouples[nKeyId].split("=");
            gso[decodeURIComponent(aItKey[0])] = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
        }
    }
};
ggo.encodeUriData = function (obj) {
    var list = [];
    for (var k in obj) {
        list.push(encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]));
    }
    if (list.length == 0) {
        return "";
    }
    return "?" + list.join("&");
};
ggo.webReqGet = function (url, data, onSuccess, onFail) {
    var reqUrl = url + ggo.encodeUriData(data);
    var xhr = new XMLHttpRequest();
    xhr.responseType = "text";
    xhr.addEventListener("load", function () {
        var txt = xhr.response;
        if (typeof onSuccess === "function") {
            onSuccess(txt);
        }
    });
    xhr.addEventListener("error", function () {
        if (typeof onFail === "function") {
            onFail();
        }
    });
    xhr.open("GET", reqUrl);
    xhr.send(null);
};
ggo.loadScriptList = function (list, onProgress, onComplete) {
    if (list == null || list.length === 0) {
        onProgress(100);
        onComplete();
        return;
    }
    var count = 0;
    var loadNext = function () {
        ggo.loadSingleScript(list[count], loadComplete);
    };
    var loadComplete = function () {
        count++;
        onProgress(Math.floor(count / list.length * 100));
        if (count < list.length) {
            loadNext();
        } else {
            onComplete();
        }
    };
    loadNext();
};
ggo.loadImage = function (url, key, onComplete, onFail) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
        if (typeof onComplete === "function") {
            onComplete(new egret.BitmapData(img));
        }
        img.onload = null;
        img.onerror = null;
    };
    img.onerror = function () {
        if (typeof onFail === "function") {
            onFail();
        }
        img.onload = null;
        img.onerror = null;
    };
    img.src = url;
};

ggo.start = function () {
    ggo.webReqGet("manifest.json", null, function (txt) {
        var manifest = JSON.parse(txt);
        ggo.loadScriptList(manifest.initial.concat(manifest.game),
            function (p) {
            },
            function () {
                egret.runEgret({renderMode: "webgl"});
            });
    });
};