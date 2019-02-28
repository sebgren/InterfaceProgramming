function getLoginCredentials(){
	var usrname = document.getElementById('username');
	var pswrd = document.getElementById('password');

	console.log('username= ' + usrname.value);
	console.log('password= ' + pswrd.value);
}
/**
 * Function for updating string showing credit of VIP-customer
 */
function showCredit(userName) {
	var credit =  userDetails(userName)[5];
	var stringCredit = document.getElementById('creditString');
	stringCredit.textContent = "Hi "+ userDetails(userName)[2] + "! Your current credit is: " + credit;
}

/**
 * Function for modifying the standard order page to provide extra features for staff
 */
function checkIfStaff() {
	if(sessionStorage.getItem("isStaff") == 1) {
		var toptext = document.getElementsByClassName("header");
		toptext[0].innerHTML = "<h1>Bar</h1>";
		var btn = document.createElement("BUTTON");
		var t = document.createTextNode("Switch to table view");
		btn.appendChild(t);
		btn.className = "switch-view-button";
		btn.setAttribute('onclick', "window.location.href ='tables.html';");
		document.body.insertBefore(btn, toptext[0]);
	}
}

/**
 * Function for switching to staff version of order page.
 */
function switchToOrder() {
	sessionStorage.setItem("isStaff", 1);
	window.location.href ="order.html";
}
