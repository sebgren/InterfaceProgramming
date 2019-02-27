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