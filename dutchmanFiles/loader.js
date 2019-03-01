// =====================================================================================================
// SOme sample API functions for the Flying Dutchman data base.
// =====================================================================================================
// Author: Lars Oestreicher, 2018
//
// Adapted from a mySQL data base.
//
// We use (global) variables to store the data. This is not generally advisable, but has the
// advantage that the data is easy to access through simple APIs. Also, when storing as local storage,
// all data is stored as strings, which might be adding some complexity.
//

var DB = ("DBLoaded.js");
var DB2 = ("Beverages.js");


//Done by Lars
function allUserNames() {
    var nameCollect = [];
    for (i = 0; i < DB.users.length; i++) {
        nameCollect.push(DB.users[i].username);
    }
    return nameCollect;
}
//Not used right now, might be useful later
//Gets all the different types of beverages.
function loadBeverages(){
    //creates listarray with all drinktypes   
    var alldrinktypes = [];
    for (i = 0; i < DB2.spirits.length; i++) {
        alldrinktypes.push(DB2.spirits[i].varugrupp);
    }
    //Removes dupliactes from array
    var uniqueDrinkTypes = alldrinktypes.filter(function(item, pos){
        return alldrinktypes.indexOf(item)== pos; 
    });

    console.log("unique drink types= " + uniqueDrinkTypes);

    return uniqueDrinkTypes;
}

//Creates divs according to how many drinks that you set "sliceddrinkList to".

//that need to be shown
function createDrinkDivs(drink){
    var slicedDrinkList = [];
    //slice generates an error in the log but still works.
    slicedDrinkList = drink.slice(0, 100);

    console.log("number of beers ===> " + drink.length);

    //Using join to convert array to string
    var firstDrinkString = drink[1].join();
    var remove;
    var drinkInfo;
    var drinkDiv = document.createElement('div');

   
    //if the string includes Ale
    if(firstDrinkString.includes("Ale") == true){
        remove = "drinkDivClass";
        eraseFunction(remove);


        for(i=0; i<slicedDrinkList.length; i++){
            drinkDiv = document.createElement('div');
            drinkDiv.className="drinkDivClass";
            drinkDiv.id="beerDivId";
            
            drinkInfo = slicedDrinkList[i];
            drinkDiv.draggable =true;
            drinkDiv.ondragstart="drag(event)";
            
            document.getElementById('dc').appendChild(drinkDiv);
            
            //Testing onclick with a random page       
            drinkDiv.onclick="location.href='https://www.w3schools.com';"

            //Set first element of array to display in div. 0 = the name of the drink.
            drinkDiv.innerHTML = drinkInfo[0] + " " + drinkInfo[1];            
        }                  
    }

    if(firstDrinkString.includes("Whisky") == true){
            remove = "drinkDivClass";
            eraseFunction(remove);
        for(i=0; i<slicedDrinkList.length; i++) 
        {
            var drinkDiv = document.createElement('div');
            drinkDiv.className="drinkDivClass";
            drinkDiv.id="whiskeyDivId";
            document.getElementById('dc').appendChild(drinkDiv);
            drinkInfo = slicedDrinkList[i];
            drinkDiv.innerHTML = drinkInfo[0] + " " + drinkInfo[1];
        }     
    }        

    if(firstDrinkString.includes("Vin") == true){
            remove = "drinkDivClass";
            eraseFunction(remove);

        for(i=0; i<slicedDrinkList.length; i++) 
        {
            var drinkDiv = document.createElement('div');
            drinkDiv.className="drinkDivClass";
            drinkDiv.id="wineDivId";
            document.getElementById('dc').appendChild(drinkDiv);
            drinkInfo = slicedDrinkList[i];
            drinkDiv.innerHTML = drinkInfo[0] + " " + drinkInfo[1];
        }     
    }             
}



//Used to remove the divs 
function eraseFunction(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
//for the drag and drop (not working with drinkDivs at the moment)
function allowDrop(ev) {
  ev.preventDefault();
}

//for the drag and drop (not working with drinkDivs at the moment)
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

//for the drag and drop (not working with drinkDivs at the moment)
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

//When the beer button is clicked
function checkBeerBox(){
    remove = "drinkDivClass";
    eraseFunction(remove);
    drink = "Ale";
    getCorrectDrinkWithbutton(drink);
}

//When the whiskey button is clicked
function checkWhiskeyBox(){
    remove = "drinkDivClass";
    eraseFunction(remove);
    drink = "Whisky";
    getCorrectDrinkWithbutton(drink);
}

//When the wine button is clicked
function checkWineBox(){
    remove = "drinkDivClass";
    eraseFunction(remove);
    drink = "Vin";
    getCorrectDrinkWithbutton(drink);
}

//function to get all the drinks
function getDrinks(){
    var allDrinks = [];
    for (i = 0; i < DB2.spirits.length; i++) {
        allDrinks.push(DB2.spirits[i]);
    }

    
    return allDrinks;    


    
}

//Creates a list with specified drink and sends it to the 
//function that creates divs (createDrinkDivs).
function getCorrectDrinkWithbutton(drink){
    var collector = [];
    collector = getDrinks();
    var drinkID = 0;
    var specificDrinks = [];
    
    for(i=0; i<collector.length; i++){

        if(collector[i].varugrupp.includes(drink)){
            specificDrinks.push([collector[i].namn, collector[i].namn2, collector[i].varugrupp, collector[i].nr]);
            drinkID += 1;    

        }
    }

    
    
    specificDrinks.sort();

    

    createDrinkDivs(specificDrinks);
}

function getCorrectDrink(drink){
    console.log("getCorrectDrink reached");
    var collector = [];
    collector = getDrinks();
    var drinkID = 0;
    var specificDrinks = [];
    
    for(i=0; i<collector.length; i++){
        console.log("in the loop");
        if(collector[i].varugrupp.includes(drink)){

            specificDrinks.push([collector[i].namn, collector[i].namn2, collector[i].varugrupp, collector[i].nr]);
            drinkID += 1;    
        }
    }
    
    specificDrinks.sort();

    return specificDrinks;
}

//creates divs when the page loads
window.onload = createDivsOnLoad;
function createDivsOnLoad(){
    remove = "drinkDivClass";
    eraseFunction(remove);
    var ales = [];
    ales = getCorrectDrink("Ale");
    slicedAle = [];
    slicedAle = ales.slice(0, 100);

    var whiskeys = [];
    whiskeys = getCorrectDrink("Whisky");
    slicedWiskey = [];
    slicedWiskey = whiskeys.slice(0, 100);

    var wines = [];
    wines = getCorrectDrink("Vin");
    slicedWine = [];
    slicedWine = wines.slice(0, 100);

    var drinkInfo;
    var drinkDiv = document.createElement('div');

    for(i=0; i<slicedAle.length; i++){
        console.log("loop 1");
            
        drinkDiv = document.createElement('div');
        drinkDiv.className="drinkDivClass";
        drinkDiv.id="beerDivId";
        drinkInfo = slicedAle[i];
        //console.log("drinkinfo == " + drinksToDisplay[i]);
        drinkDiv.innerHTML = drinkInfo[0] + " " + drinkInfo[1]; 
        document.getElementById('dc').appendChild(drinkDiv);
                                   
    }
    for(i=0; i<slicedWine.length; i++){
        console.log("loop 2");
        drinkDiv = document.createElement('div');
        drinkDiv.className="drinkDivClass";
        drinkDiv.id="wineDivId";


        drinkInfo = slicedWine[i];
        //console.log("drinkinfo == " + drinksToDisplay[i]);
        drinkDiv.innerHTML = drinkInfo[0]+ " " + drinkInfo[1]; 
        document.getElementById('dc').appendChild(drinkDiv);                              
    }

    for(i=0; i<slicedWiskey.length; i++){    
        console.log("loop 3");
        drinkDiv = document.createElement('div');
        drinkDiv.className="drinkDivClass";
        drinkDiv.id="whiskeyDivId";
        drinkInfo = slicedWiskey[i];
        //console.log("drinkinfo == " + drinksToDisplay[i]);
        drinkDiv.innerHTML = drinkInfo[0] + " " + drinkInfo[1]; 
        document.getElementById('dc').appendChild(drinkDiv);
                                   
    }

}


//User authentication function - for logging in as VIP or staff.
function validateUser(){
    var usrname = document.getElementById('username');
    var pswrd = document.getElementById('password');

    //if match = true, the user will log in
    var match = false;

    //creates list with all the useranmes
    var usernameCollect = [];
    for (i = 0; i < DB.users.length; i++) {
        usernameCollect.push(DB.users[i].username);
    }
    console.log("usernameCollect list = " + usernameCollect[2]);


    //creates list with all the passwords
    var passwordCollect = [];
    for (i = 0; i < DB.users.length; i++) {
        passwordCollect.push(DB.users[i].password);
    }

    //creates list with all the credentials
    var credentialsCollect = [];
    for (i = 0; i < DB.users.length; i++) {
        credentialsCollect.push(DB.users[i].credentials);
    }

    //variable to store current index, used to check credential-number
    var userIndex = 0;

    //loops through the list of usernames
    //if it username matches with username input it checks if the password is correct too
    for(i=0; i < usernameCollect.length; i++){

        if(usernameCollect[i] == usrname.value){
                if(passwordCollect[i] == pswrd.value){
                    userIndex = i;
                    match = true;
                }
          
            }
        }

    //if bool is true the user is redirected to the right page
    if(match == true){
        //Not the right pages, just to test the functionality.
        if(credentialsCollect[userIndex] == 4){
            window.location.href = "./pages/tables.html";
        } else {
            window.location.href = "./pages/order-VIP.html";
        }
    }
    else{
        window.alert("Wrong username or password");
    }
    
}

//To search for specific drinks
function searchFunction(listToSearch){
    var input = document.getElementById("myInput");
    var filter = input.value.toLowerCase();
    var divs = document.getElementsByClassName('drinkDivClass');

    for (i = 0; i < divs.length; i++) {
        if (divs[i].innerText.toLowerCase().includes(filter)){
        divs[i].style.display = "block";

        } 
        else {
        divs[i].style.display = "none";
        }  
    } 
}  
//Lars code vvvvv
// =====================================================================================================
// This is an example of a file that will return an array with some specific details about a
// selected user name (not the first name/alst name). It will also add details from another "database"
// which contains the current account status for the person.
//
function userDetails(userName) {
    var userCollect = [];
    var userID;
    var userIndex;
    var account;

    // First we find the user ID of the selected user. We also save the index number for the record in the JSON
    // structure.
    //
    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
            userIndex = i;
        };
    };

    // We get the current account status from another table in the database, account. We store this in
    // a variable here for convenience.
    //
    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            account = DB.account[i].creditSEK;
        }
    };

    // This is the way to add the details you want from the db into your own data structure.
    // If you want to change the details, then just add or remove items accordingly below.
    userCollect.push(
        DB.users[userIndex].user_id,
        DB.users[userIndex].username,
        DB.users[userIndex].first_name,
        DB.users[userIndex].last_name,
        DB.users[userIndex].email,

        account
    );

    return userCollect;
}

// =====================================================================================================
// This function will change the credit amount in the user's account. Note that the amount given as argument is the new
// balance and not the changed amount (± balance).
//
function changeBalance(userName, newAmount) {

    // We use this variable to store the userID, since that is the link between the two data bases.
    var userID;

    // First we find the userID in the user data base.
    //
    for (i = 0; i < DB.users.length; i++) {
        if (DB.users[i].username == userName) {
            userID = DB.users[i].user_id;
        };
    };

    // Then we match the userID with the account list.
    // and change the account balance.
    //
    for (i = 0; i < DB.account.length; i++) {
        if (DB.account[i].user_id == userID) {
            DB.account[i].creditSEK = newAmount;   // This changes the value in the JSON object.
        };
    };

}
// =====================================================================================================
// Returns a list of all the names of the beverages in the database. This function can be used as a
// recipe for similar functions.
//
function allBeverages() {

    // Using a local variable to collect the items.
    var collector = [];

    // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
    // items, you may introduce filter functions in the loop... see the template within comments.
    //
    for (i = 0; i < DB2.spirits.length; i++) {
        collector.push([DB2.spirits[i].namn, DB2.spirits[i].varugrupp]);
    };
    //

    createDrinkDivs(collector);
}

// =====================================================================================================
// This function returns the names of all strong beverages (i.e. all that contain a percentage of alcohol
// higher than the strength given in percent.
//
function allStrongBeverages(strength) {

    // Using a local variable to collect the items.
    //
    var collector = [];

    // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
    // items, you may introduce filter functions in the loop... see the template within comments.
    //
    for (i = 0; i < DB2.spirits.length; i++) {

        // We check if the percentage alcohol strength stored in the data base is lower than the
        // given limit strength. If the limit is set to 14, also liqueuers are listed.
        //
        if (percentToNumber(DB2.spirits[i].alkoholhalt) > strength) {

            // The key for the beverage name is "namn", and beverage type is "varugrupp".
            //
            collector.push([DB2.spirits[i].namn, DB2.spirits[i].varugrupp]);
        };
    };

    // Don't forget to return the result.
    //
    return collector;
}

// =====================================================================================================
// Lists all beverage types in the database. As you will see, there are quite a few, and you might want
// select only a few of them for your data.
//
function beverageTypes() {
    var types = [];
    for (i = 0; i < DB2.spirits.length; i++) {
        addToSet(types, DB2.spirits[i].varugrupp);
    };
    return types;
}

// =====================================================================================================
// Adds an item to a set, only if the item is not already there.
// The set is modelled using an array.
//
function addToSet(set, item) {
    if (!set.includes(item)) {
        set.push(item);
    }
    return set;
}

// =====================================================================================================
// Convenience function to change "xx%" into the percentage in whole numbers (non-strings).
//
function percentToNumber(percentStr) {
    return Number(percentStr.slice(0,-1));
}



// =====================================================================================================
// =====================================================================================================
// END OF FILE
// =====================================================================================================
// =====================================================================================================


