// var hiddenTab = 

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

/**
 * Shows payment modal for normal payment.
 */
function showPayment() {
	// Make modal visible.
	var modal = document.getElementById('payment-modal');
	modal.style.display = "block";

	// Adds close functionality to X.
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function () {
		modal.style.display = "none";
	}

	// Closes modal if user clicks outside of modal.
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}

/**
 * Shows payment modal for paying with VIP-credits. Calls function to update credits. Shows appropriate message for
 * successful as well as unsuccessful payments.
 */
function showPaymentVip() {

	if(sessionStorage.getItem("vipUsername")!= null) {
		// Make modal visible.
		var modal = document.getElementById('vip-payment-modal');
		modal.style.display = "block";

		// Update credit
		if(updateCredit(150)){ 							//TODO: CHANGE TO NON-DUMMY AMOUNT)
			//Modify text in modal footer if successful.
			var modalFooter = modal.getElementsByClassName("modal-footer");
			modalFooter[0].innerHTML = "Thank you for your purchase!" +
			" <p style='font-size: 0.7em; font-weight: normal'>Your VIP-credit has been updated.</p>";
		} else {
			//Modify text if unsuccessful.
			var modalHeader = document.getElementById("vip-modal-header");
			modalHeader.lastElementChild.textContent = "Payment unsuccessful!";
			modalHeader.style.color = "IndianRed";

			var modalFooter = document.getElementById("vip-modal-footer");
			modalFooter.innerHTML = "You do not have enough credit." +
				" <p style='font-size: 0.7em; font-weight: normal'>Please contact our staff.</p>";
			modalFooter.style.color = "IndianRed";

			var modalBody = document.getElementById("vip-modal-body");
			modalBody.innerHTML = "<i class='fas fa-times-circle'" +
			"style='font-size:100px;color:IndianRed; padding-bottom: 25px;'></i>";
		}

		// Adds close functionality to X.
		var span = document.getElementsByClassName("close")[1];
		span.onclick = function () {
			modal.style.display = "none";
		}

		// Closes modal if user clicks outside of modal.
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}
}

/**
 * Updates user credit and updates string displaying credit. No update will be made if user doesn't have enough credit.
 * @param amount The value with which to decrement user credit.
 * @returns {boolean} Returns true if successfully decremented credit. Returns false if user doesn't have enough credits.
 */
function updateCredit(amount) {
	var userName = sessionStorage.getItem("vipUsername")
	var credit =  userDetails(userName)[5];
	let newCredit = credit - amount;
	if(newCredit >= 0) {
		// Update credit through teacher-provided function.
		changeBalance(userName, newCredit);
		// Update credit string.
		showCredit(sessionStorage.getItem("vipUsername"));
		return true;
	} else {
		return false;
	}
}