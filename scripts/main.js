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
	stringCredit.innerHTML = userDetails(userName)[2] + ", <span id=\"current-credits\"></span>" + credit;
}

/**
 * Function for modifying the standard order page to provide extra features for staff
 */
function checkIfStaff() {
	if(sessionStorage.getItem("isStaff") == 1) {
		var toptext = document.getElementsByClassName("header");
		toptext[0].innerHTML = "<h1>Bar</h1>";
		var btn = document.createElement("BUTTON");
        btn.innerHTML = "<span id='switch-to-table'>Switch to table view</span>"
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
	if (document.getElementById("total-price").textContent != '0') {
		// Make modal visible.
		var modal = document.getElementById('payment-modal');
		modal.style.display = "block";

		// Adds close functionality to X.
		var span = document.getElementById("close-normal");
		span.onclick = function () {
			modal.style.display = "none";
		}

		// Closes modal if user clicks outside of modal.
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}


		// Empty the tab by removing all the li children
		$("#items").empty();

		// Remove the list of items in localStorage
		localStorage.removeItem("itemsInTab");

		$("#section-price").hide();
		document.getElementById("total-price").innerText = 0;
	}
}

/**
 * Shows payment modal for paying with VIP-credits. Calls function to update credits. Shows appropriate message for
 * successful as well as unsuccessful payments.
 */
function showPaymentVip() {
	if (document.getElementById("total-price").textContent != '0') {
		if (sessionStorage.getItem("vipUsername") != null) {
			// Make modal visible.
			var modal = document.getElementById('vip-payment-modal');
			modal.style.display = "block";
			var amount = document.getElementById("total-price").textContent;
			// Update credit
			if (updateCredit(amount)) {
				// Modify text in modal footer if successful.
				var modalFooter = modal.getElementsByClassName("modal-footer");
				modalFooter[0].innerHTML = "<span id=\"pay-thanks-vip\">Thank you for your purchase!</span>" +
					" <p style='font-size: 0.7em; font-weight: normal'><span id=\"vip-update\">Your VIP-credit has been updated.</span></p>";

				// Empty the tab by removing all the li children
				$("#items").empty();

				// Remove the list of items in localStorage
				localStorage.removeItem("itemsInTab");
				$("#section-price").hide();
				document.getElementById("total-price").textContent = 0;
			} else {
				//Modify text if unsuccessful.
				var modalHeader = document.getElementById("vip-modal-header");
				modalHeader.lastElementChild.innerHTML = "<span id=\"payment-failure\"> Payment unsuccessful!</span>";
				modalHeader.style.color = "IndianRed";

				var modalFooter = document.getElementById("vip-modal-footer");
				modalFooter.innerHTML = "<span id='no-credit'>You do not have enough credit.</span>" +
					" <p style='font-size: 0.7em; font-weight: normal'><span id='contact-staff'>Please contact our staff.</span></p>";
				modalFooter.style.color = "IndianRed";

				var modalBody = document.getElementById("vip-modal-body");
				modalBody.innerHTML = "<i class='fas fa-times-circle'" +
					"style='font-size:100px;color:IndianRed; padding-bottom: 25px;'></i>";
			}

			// Adds close functionality to X.
			var span = document.getElementById("close-vip");
			span.onclick = function () {
				modal.style.display = "none";
			}

			// Closes modal if user clicks outside of modal.
			window.onclick = function (event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			}

            //Updates the language again since text is inserted via javascript and therefore overwrites original text.
            this.updateLang()
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

function logout() {
	sessionStorage.removeItem('vipUsername');
	sessionStorage.removeItem('isStaff');
	window.location.href ="../index.html";
}


/**
 * Same funciton as in file /scripts/translate.js. Updates the language on the page by
 * going through all of the variables in lang.json and then matches json keys with
 * appropriate ID and fills the innerHTML or placeholder with the right text.
**/
function updateLang() {
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
}