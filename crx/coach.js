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
    var reg = new RegExp("\\b" + word + "\\b");
    $("p").each(function() {
        var v = $(this);
        v.html(v.html().replace(reg, dest))
    })
}

function highlight(word) {
    replaceWord(word, "<b>" + word + "</b>");
}

// localStorage
function addCustomKey(key) {
    chrome.storage.local.get("custom_keys", function(items){
        items.custom_keys[key] = true;
        log("after add: " + Object.keys(items.custom_keys));
        chrome.storage.local.set(items);
    });
}

function addCustomKeys(keys) {
    chrome.storage.local.get("custom_keys", function(items){
        keys.forEach(function(key) {
            items.custom_keys[key] = true;
        });
        log("after add: " + Object.keys(items.custom_keys));
        chrome.storage.local.set(items);
    });
}

function logCustomKeys() {
    chrome.storage.local.get("custom_keys", function(items) {
        log("log: " + Object.keys(items.custom_keys));
    });
}

function setCustomKeys(keys) {
    chrome.storage.local.set({"custom_keys": keys}, function(){
        log("custom_keys saved.")
    });
}
/////////// main ///////////

// known words
var knownSet = new Set();
// add cet-4
knownSet.addAll(cet4_keys);
log("after add cet-4, known count = " + knownSet.size());
// add junior high
knownSet.addAll(junior_high_keys);
log("after add junior high, known count = " + knownSet.size());
// add senior high
knownSet.addAll(senior_high_keys);
log("after add senior high, known count = " + knownSet.size());
// add personal custom words
// setCustomKeys({});
if (typeof(custom_keys) !== "undefined") {
    knownSet.addAll(custom_keys);
    log("after add custom words, known count = " + knownSet.size());
    addCustomKeys(custom_keys);
}

// article
var articleSet = new Set();
var words = $("p").text().split(/[^a-zA-Z]/);
articleSet.addAll(words);
articleSet.remove("")
log("article words count = " + articleSet.size());

// unknown words
var unknownSet = new Set();
articleSet.each(function(word) {
    if (!knownSet.contains(word.toLowerCase())) {
        unknownSet.add(word);
    }
});
log("unknown words count = " + unknownSet.size());

// highlight unknown words
unknownSet.each(function(word) {
    highlight(word);
});
