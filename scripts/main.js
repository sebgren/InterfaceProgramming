var hiddenTab = 

function getLoginCredentials(){
	var usrname = document.getElementById('username');
	var pswrd = document.getElementById('password');

	console.log('username= ' + usrname.value);
	console.log('password= ' + pswrd.value);
}

function getCredit(userName) {
	return userDetails(userName)[5];
}

function showCredit(userName) {
	var credit = getCredit(userName);
	var stringCredit = document.getElementById('creditString');
	stringCredit.textContent = "Hi "+ userName + "! Your current credit is: " + credit;
}


/**
FUNCTIONS FOR TABLES-VIEW
**/

//Displays the tab. currently, it will only display the hard-coded
//tab for table one.
function displayTab() {
	document.getElementById('tab-content').style.visibility = "visible";
	showFooter(true);
}

//Adds the animation class and then removes it when it's done playing
async function clickAnimation(btn){
	//document.getElementById(btn).className = "btn-animation btn " + btn;
	//await sleep(500);
	//document.getElementById(btn).className = "btn " + btn;
	if (document.getElementById('tab-footer').style.opacity == "1") {
		document.getElementById('tab-content').style.visibility = "hidden";
		showFooter(false);
		document.getElementsByClassName("active-table")[0].style.animation = "none";
	}

}

function showFooter(val) {
	if (val) {
		document.getElementById('tab-footer').style.opacity = "1";
	} else {
		document.getElementById('tab-footer').style.opacity = "0.4";
	}
}

//below is a function to make the button click animation
//work properly more than once
//function sleep(ms) {
  //return new Promise(resolve => setTimeout(resolve, ms));
//}