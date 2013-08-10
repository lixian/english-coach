// global funcitons
var Set = function() {}
Set.prototype._add = function(o) { this[o] = true; }
Set.prototype._remove = function(o) { delete this[o]; }
Set.prototype._contains = function(o) { return this[o] != undefined }
Set.prototype._addArray = function(o) { for (var i in o) { this._add(o[i]); } }
Set.prototype._keys = function() {
    var keys = [];
    var i = 0;
    for (var key in this) {
        if (!/_.*/.test(key)) {
            keys[i] = key;
            i++;
        }
    }
    return keys;
}

function log(obj) { console.log(obj); } 
function addCount(map, word) {
    if (map[word] == undefined) {
        map[word] = 0;
    }
    map[word]++;
}

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

/////////// main ///////////

// known words
var knownSet = new Set();

// add cet-4
knownSet._addArray(cet4_keys);
log("after add cet-4, known count = " + knownSet._keys().length);
// add junior high
knownSet._addArray(junior_high_keys);
log("after add junior high, known count = " + knownSet._keys().length);
// add personal custom words
if (typeof(custom_keys) !== "undefined") {
    knownSet._addArray(custom_keys);
    log("personal custom keys: " + custom_keys);
    log("after add custom words, known count = " + knownSet._keys().length);
}

// article
var s = $("p").text();
var words = s.split(/[^a-zA-Z]/);
var set = new Set();
set._addArray(words);
set._remove("")
log("article count = " + set._keys().length);

// unknown words
var unknownSet = new Set();
keys = set._keys();
log(keys);
for (var i in keys) {
    var word = keys[i];
    if (!knownSet._contains(word.toLowerCase())) {
        unknownSet._add(word);
    }
}
log("unknown count = " + unknownSet._keys().length);
log("unknown keys:");

// highlight unknown words
var unknownKeys = unknownSet._keys();
for (i in unknownKeys) {
    var word = unknownKeys[i];
    highlight(word);
}

