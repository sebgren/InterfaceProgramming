console.log(translation)
dbTrans = translation

$( document ).ready(function() {
	if (localStorage.getItem("lang") == "swe") {
		for (key in dbTrans) {
			elem = document.getElementById(key)
			if (elem != null) {
                console.log(elem.getAttribute("placeholder"))
                if(elem.getAttribute("placeholder") != null) {
				    elem.placeholder = dbTrans[key].swe
                } else {
                    elem.innerHTML = dbTrans[key].swe
                }
		}
	}
}
});