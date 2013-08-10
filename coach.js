// global funcitons
var Set = function() {}
Set.prototype._add = function(o) { this[o] = true; }
Set.prototype._remove = function(o) { delete this[o]; }
Set.prototype._contains = function(o) { return this[o] != undefined }
Set.prototype._keys = function() { return Object.keys(this); }
Set.prototype._addArray = function(o) { for (var i in o) { this._add(o[i]); } } 

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
var articleSet = new Set();
articleSet._addArray(words);
articleSet._remove("")
articleKeys = articleSet._keys();
log("article words count = " + articleKeys.length);

// unknown words
var unknownSet = new Set();
articleKeys.forEach(function(word) {
    if (!knownSet._contains(word.toLowerCase())) {
        unknownSet._add(word);
    }
});
var unknownKeys = unknownSet._keys();
log("unknown words count = " + unknownKeys.length);

// highlight unknown words
unknownKeys.forEach(function(word) {
    highlight(word);
});

