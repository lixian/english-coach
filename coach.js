// global funcitons
<<<<<<< HEAD
var Set = function() { this._map = {}; }
Set.prototype.add = function(k) { this._map[k] = true; }
Set.prototype.remove = function(k) { delete this._map[k]; }
Set.prototype.contains = function(k) { return this._map[k] != undefined }
Set.prototype.keys = function() { return Object.keys(this._map); }
Set.prototype.each = function(callback) { this.keys().forEach(callback); } 
Set.prototype.size = function() { return this.keys().length; }
Set.prototype.addAll = function(arr) { var self = this; arr.forEach(function(k) { self.add(k); }); }
=======
var Set = function() {}
Set.prototype._add = function(o) { this[o] = true; }
Set.prototype._remove = function(o) { delete this[o]; }
Set.prototype._contains = function(o) { return this[o] != undefined }
Set.prototype._keys = function() { return Object.keys(this); }
Set.prototype._addArray = function(o) { for (var i in o) { this._add(o[i]); } } 
>>>>>>> 7fa7748ec3ae61d0df773650163b9c96eadbb0d4

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

/////////// main ///////////

// known words
var knownSet = new Set();
// add cet-4
knownSet.addAll(cet4_keys);
log("after add cet-4, known count = " + knownSet.size());
// add junior high
knownSet.addAll(junior_high_keys);
log("after add junior high, known count = " + knownSet.size());
// add personal custom words
if (typeof(custom_keys) !== "undefined") {
    knownSet.addAll(custom_keys);
    log("after add custom words, known count = " + knownSet.size());
}

// article
<<<<<<< HEAD
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
=======
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
>>>>>>> 7fa7748ec3ae61d0df773650163b9c96eadbb0d4
    highlight(word);
});

