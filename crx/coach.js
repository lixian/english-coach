// global funcitons
var Set = function() { this._map = {}; }
Set.prototype.add = function(k) { this._map[k] = true; }
Set.prototype.remove = function(k) { delete this._map[k]; }
Set.prototype.contains = function(k) { return this._map[k] != undefined }
Set.prototype.keys = function() { return Object.keys(this._map); }
Set.prototype.each = function(callback) { this.keys().forEach(callback); } 
Set.prototype.size = function() { return this.keys().length; }
Set.prototype.addAll = function(arr) { var self = this; arr.forEach(function(k) { self.add(k); }); }

function log(obj) { console.log(obj); } 

function replaceWord(word, dest) {
     //log("replaceWord " + word + " -> " + dest);
    replaceHtml("\\b" + word + "\\b", dest);
}
function replaceHtml(word, dest) {
    var reg = new RegExp(word);
     //log("replaceHtml " + reg + " -> " + dest);
    $("p").each(function() {
        var v = $(this);
        v.html(v.html().replace(reg, dest))
    })
}
function known(knownSet, word) {
    var s = word.toLowerCase();
    if (knownSet.contains(s)) {
        return true;
    }
    if (/s$/.test(s) && knownSet.contains(s.substring(0, s.length - 1))) {
        return true;
    }
    if (/es$/.test(s) && knownSet.contains(s.substring(0, s.length - 2))) {
        return true;
    }
    if (/d$/.test(s) && knownSet.contains(s.substring(0, s.length - 1))) {
        return true;
    }
    if (/ed$/.test(s) && knownSet.contains(s.substring(0, s.length - 2))) {
        return true;
    }
    if (/ing$/.test(s) && knownSet.contains(s.substring(0, s.length - 3))) {
        return true;
    }
    return false;
}

function wrap(word) {
    return "<span>" + word + "</span>";
}

function highlight(word) {
    replaceWord(word, wrap(word));
}

// localStorage
function addCustomKey(key) {
    chrome.storage.local.get("custom_keys", function(items){
        if (!items.custom_keys) {
            items.custom_keys = [];
        }
        var keys = items.custom_keys;
        keys.push(key);
        //log("after add: " + Object.keys(items.custom_keys));
        chrome.storage.local.set(items, function() {
            log("saved key: " + key);
            logCustomKeys();
            
        });
    });
}

function addCustomKeys(keys) {
    /*
     *chrome.storage.local.get("custom_keys", function(items){
     *    keys.forEach(function(key) {
     *        items.custom_keys[key] = true;
     *    });
     *    log("after add: " + Object.keys(items.custom_keys));
     *    chrome.storage.local.set(items);
     *});
     */
}

function logCustomKeys() {
    chrome.storage.local.get("custom_keys", function(items) {
        log("custom keys: " + items.custom_keys);
    });
}

function setCustomKeys(keys) {
    chrome.storage.local.set({"custom_keys": keys}, function(){
        log("custom_keys saved.")
    });
}
/////////// main ///////////
function lower(arr) {
    return arr.map(function(word) { return word.toLowerCase(); });
}

// known words
var knownSet = new Set();
// add stopwords
knownSet.addAll(lower(stopwords));
log("after add stopwords, known count = " + knownSet.size());
// add cet-4
knownSet.addAll(lower(cet4_keys));
log("after add cet-4, known count = " + knownSet.size());
// add junior high
knownSet.addAll(lower(junior_high_keys));
log("after add junior high, known count = " + knownSet.size());
// add senior high
knownSet.addAll(lower(senior_high_keys));
log("after add senior high, known count = " + knownSet.size());

// add personal custom words
// setCustomKeys(null);
chrome.storage.local.get("custom_keys", function(items){
    var keys = items.custom_keys;
    if (keys) {
        knownSet.addAll(lower(keys));
        log("after add custom, known count = " + knownSet.size());
    }

    // do others
    others();
});

function others() {
    // article
    var articleSet = new Set();
    var words = $("body").text().split(/[^a-zA-Z]/);
    articleSet.addAll(words);
    articleSet.remove("")
        log("article words count = " + articleSet.size());

    // unknown words
    var unknownSet = new Set();
    articleSet.each(function(word) {
        if (!known(knownSet, word)) {
            unknownSet.add(word);
        }
    });
    log("unknown words count = " + unknownSet.size());
    chrome.extension.sendRequest(
            {type: "saveUnknown", unknownSet: unknownSet}, 
            function(response) {
            }
            );

    function fanyiUrl(word) {
        return "http://fanyi.youdao.com/openapi.do?keyfrom=EnglishCoach&key=139078614&type=data&doctype=json&version=1.1&q=" + word;
    }

    function translate(word, data) {
        // translate
        var trans = data.translation[0];
        log(data.query + " -> " + trans);
        if (trans.toLowerCase() !== data.query.toLowerCase()) {
            replaceHtml(wrap(word), wrap(word) + "<b data-type='fanyi-test' data-key='api_"+ word +"' style=''>(" + trans + ")</b>");
        }
    }
    $(document).delegate('[data-type="fanyi-test"]', "click", function (e) {
        var $this = $(this);
        var thisWord = $this.text();
        var keyWord = $this.attr("data-key");
        var coording = {
            left: $this.offset().left, top: $this.offset().top
        };
        var thisWidth = $this.width();

        var word = keyWord.replace("api_", "");
        log("addCustomKey: " + word);
        addCustomKey(word);
        $("[data-key='" + keyWord + "']").remove();
        chrome.extension.sendRequest(
            {type: "getDialogHtml", key: keyWord},
            function(response) {
                var dialogHtmlStr = response.dialogHtmlStr;

            }
            );
    });
    function get(key) {
        return localStorage[key];
    }

    function set(key, val) {
        chrome.storage.local.set({key: val}, function(){
            log(key + " saved.")
        });
    }

    set("xxx", 111);
    function label(word) {
        var apiKey = "api_" + word;
        if (localStorage[apiKey]) {
            var value = JSON.parse(localStorage[apiKey]);
            translate(word, value);
            return;
        }
        chrome.extension.sendRequest({apiKey: apiKey, type: "queryDic"}, function(response) {
            var value = response.value;
            if (typeof(value) == "undefined") {
                // request api
                $.getJSON(fanyiUrl(word), function(data){
                    // save in cache
                    translate(word, data);
                    localStorage[apiKey] = JSON.stringify(data);
                });
            } else {
                // cache
                log("find in cache: " + word);
                localStorage[apiKey] = value;
                translate(word, value);
            }
        });
    }

    // highlight unknown words
    unknownSet.each(function(word) {
        highlight(word);
    });

    // Query for the unknown words
    unknownSet.each(function(word) {
        label(word);
    });

    chrome.storage.local.get("hover", function(items) {
        log("last hover: " + items.hover);
    });
}
