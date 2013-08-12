/**
 * 根据词典的stopwords，进行了一些调整，主要是把带符号的词拆开
 *
 * @see https://dev.corp.youdao.com/svn/outfox/products/dict/milestones/2.3/src/java/outfox/dict/utils/lang/stopwords/EngStopWordsDepot.java
 */
var stopwords = ["s",
    "i", "aboard", "about", "above", "across", "after", "afterwards",
    "against", "agin", "ago", "agreed-upon", "ah", "alas", "albeit", "all",
    "all-over", "almost", "along", "alongside", "altho", "although", "amid",
    "amidst", "among", "amongst", "an", "and", "another", "any", "anyone",
    "anything", "around", "as", "aside", "astride", "at", "atop", "avec",
    "away", "back", "be", "because", "before", "beforehand", "behind",
    "behynde", "below", "beneath", "beside", "besides", "between", 
    "bewteen", "beyond", "bi", "both", "but", "by", "ca.", "de", "des",
    "despite", "do", "down", "due", "durin", "during", "each", "eh", 
    "either",  "en",  "every", "ever", "everyone", "everything", "except",
    "far", "fer", "for", "from", "go", "goddamn", "goody", "gosh",  "half",
    "have", "he", "hell", "her", "herself", "hey", "him", "himself", "his",
    "ho", "how", "however", "if", "in", "inside", "insofar", "instead",
    "into", "it", "its", "itself", "les", "lest", "lieu", 
    "like", "me", "minus", "moreover", "my", "myself", "near","near-by",
    "nearer", "nearest", "neither", "nevertheless", "next", "no", "nor",
    "not", "nothing", "notwithstanding", "o", "er", "of", "off", "on",
    "once", "one", "oneself", "only", "onto", "or", "other", "others",
    "otherwise", "our", "ours", "ourselves", "out", "outside", "outta",
    "over", "per", "rather", "regardless", "round", "se", "she","should",
    "since", "so", "some", "someone", "something", "than", "that", "the",
    "their", "them", "themselves", "then", "there", "therefore", "these",
    "they",  "thine", "this", "those", "thou", "though", "through",
    "throughout", "thru", "till", "to", "together", "toward", "towardes",
    "towards", "uh", "under", "underneath", "unless", "unlike", "until",
    "unto", "up", "upon", "uppon", "us", "via", "vis-a-vis", 
    "we", "well", "what", "whatever", "whatsoever", "when", "whenever",
    "where", "whereas", "wherefore", "whereupon", "whether", "which",
    "whichever", "while", "who", "whoever", "whom", "whose", "why", "with",
    "withal", "within", "without", "ye", "yea", "yeah", "yes", "yet",
    "yonder", "you", "your", "yours", "yourself", "yourselves", "s", "ll",
    "re", "m", "don", "t", "ve"
    ];