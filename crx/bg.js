chrome.browserAction.onClicked.addListener(function (tab) {
        if (window.stopwords) {
            return;
        }
        chrome.tabs.executeScript(null, {file:"keys/stopwords.js", runAt: "document_end"}, function () {
            chrome.tabs.executeScript(null, {file:"keys/junior_high_keys.js"}, function () {
                chrome.tabs.executeScript(null, {file:"keys/senior_high_keys.js"}, function () {
                    chrome.tabs.executeScript(null, {file:"keys/cet4_keys.js"}, function () {
                        chrome.tabs.executeScript(null, {file:"js/jquery.js"},function () {
                                chrome.tabs.executeScript(null, {file:"coach.js"},function () {
                                                        console.log(1234567);
                                                        });
                                                });
                                              });
                                          });
                                      });
                                  });
});

function get(key) {
    return localStorage[key];
}

function set(key, val) {
    localStorage[key] = val;
}

function getDialogHtml(key) {
    var wordsDicStr = get("md.wordsDic");
    var wordsDic = JSON.parse(wordsDicStr);
    if (wordsDic.hasOwnProperty(key)) {
        var renderData = wordsDic[key];
        var dialogHtml = renderHtml(renderData);
    }
}

function renderHtml(renderData) {
    console.log(renderData);
    var mdBaseTmpl = document.getElementById("md-base").innerText();
    var mdWebMeaningTmpl = document.getElementById("md-webmeaning").innerText();
    var mdInfoTmpl = document.getElementById("md-info").innerText;
    
}

function queryDic(apiKey) {
    var wordsDic = get("md.wordsDic");
    if (!!!wordsDic) {
        wordsDic = {};
    }
    return wordsDic[apiKey]
}

function saveWord(key, value) {
    var wordsDic = get("md.wordsDic");
    console.log();
    if (!!!wordsDic) {
        wordsDic = {};
    }
    if (wordsDic.hasOwnProperty(key)) {
        return;
    }
    wordsDic[key] = value;
    var wordsDicStr = JSON.stringify(wordsDic);
    console.log("wordsDicStr: ", wordsDicStr);
    set("md.wordsDic", wordsDicStr);

    /*
     *try {
     *    var wordsDicStr = JSON.stringify(wordsDic);
     *    set("md.wordsDic", wordsDicStr);
     *} catch (e) {
     *    console.log(e);
     *}
     */
}
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    switch (request.type) {
        case 'saveUnknown':
            set('md.unknownset', request.unKnownSet);
            break;
        case 'saveWord':
            console.log(112);
            saveWord(request.key, request.value);
            break;
        case 'queryDic':
            var queryValue = queryDic(request.apiKey);
            sendResponse({"value": queryValue});
            break;
        case 'getMarked':
            var knownSetStr = get('md.knownset');
            sendResponse({"knownSetStr": optstr});
            break;
        case 'getDialogHtml':
            var dialogHtmlStr= getDialogHtml(request.key);
            sendResponse({"dialogHtmlStr": dialogHtmlStr});
            break;
        default: break;
    }
});

