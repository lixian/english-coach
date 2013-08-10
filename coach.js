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

