console.log(translation)
dbTrans = translation


/**
 * When document is done loading, this updates the language on the page by
 * going through all of the variables in dbTrans and then matches json keys with
 * appropriate ID and fills the innerHTML or placeholder with the right text.
 * 
**/
$( document ).ready(function() {
    var lang = localStorage.getItem("lang")
    for (key in dbTrans) {
        elem = document.getElementById(key)
        if (elem) {
            if(elem.getAttribute("placeholder") != null) {
                elem.placeholder = dbTrans[key][lang]
            } else {
                elem.innerHTML = dbTrans[key][lang]
            }
        }
    }	
});