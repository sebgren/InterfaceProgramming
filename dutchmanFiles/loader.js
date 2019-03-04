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
var beerDrinks = [];
var whiskeyDrinks = [];
var wineDrinks = [];

$( document ).ready(getDrinks);

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
    // var len = DB2.spirits.length;
    var len = 50;
    for (i = 0; i < len; i++) {
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
// window.onload = createDrinkDivs;

//========================================================================================================
/*  This function takes a specific type of beverage and its list and generates a div containing all those 
 *  items.
 */
function createDrinkDivs(drinks, type){
    console.log(drinks);
    
    var drinksContainer = $("#drinks-container");
    drinksContainer.empty();

    for(var i=0; i < drinks.length; i++)
    {
        var drinkDiv = document.createElement('div');
        drinkDiv.className= type.toLowerCase() + "Div" + " beverage";
        
        drinkDiv.id = type + "-" + drinks[i].nr.toString();
        drinkDiv.draggable = true;
        drinkDiv.ondragstart = drinkDragStart;
        drinkDiv.ondragend = drinkDragEnd;
        
        //Set first element of array to display in div. 0 = the name of the drink.
        drinkDiv.innerHTML = drinks[i].namn + " " + drinks[i].namn2;


        drinksContainer.append(drinkDiv);
        
        //Testing onclick with a random page       
        // drinkDiv.onclick="location.href='https://www.w3schools.com';"
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

//========================================================================================================
/*  This function is called when a beverage starts being dragged
 */
function drinkDragStart(ev) {
    var id = ev.target.id;
    var name = ev.target.innerHTML;
    // console.log("Drag start " + id);
    localStorage.setItem("draggedId", id);
    localStorage.setItem("draggedName", name);
}


//========================================================================================================
/*  This function is called when a beverage stops being dragged
 */
function drinkDragEnd(ev) {
    // console.log("Drag end");
    setTimeout(function(){
        localStorage.removeItem("draggedId");
        localStorage.removeItem("draggedName");
    }, 300);
}

//========================================================================================================
/*  This function is called when the Beer button is clicked
 */
function checkBeerBox()
{
    getCorrectDrink("Ale");
}

//========================================================================================================
/*  This function is called when the whiskey button is clicked
 */
function checkWhiskeyBox()
{
    getCorrectDrink("Whisky");
}

//========================================================================================================
/*  This function is called when the wine button is clicked
 */
function checkWineBox()
{
    getCorrectDrink("Vin");
}

//========================================================================================================
/*  This function takes a type (string) as a parameter and call the createDrinkDivs function to create
 * corresponding list of drinks.
 */
function getCorrectDrink(type){

    if(type == "Ale")
    {
        console.log("get correct ale");
        createDrinkDivs(beerDrinks, "beer");
        return;
    }
    else if(type == "Whisky")
    {
        createDrinkDivs(whiskeyDrinks, "whiskey");
        return;
    }
    else if(type == "Vin")
    {
        createDrinkDivs(wineDrinks, "wine");
        return;
    }
    else {
        console.log("Wrong type of drink :" + type);
    }   
}

//========================================================================================================
/*  This function gets 100 each type of beverages from DB2.
 */
function getDrinks() {
    var nBeer = 0;
    var nWhiskey = 0;
    var nWine = 0;

    for(var i = 0; (nBeer + nWhiskey + nWine) < 300; i++)
    {
        if(nBeer < 100 && DB2.spirits[i].varugrupp.includes("Ale"))
        {
            beerDrinks.push(filterDrinkInfo(DB2.spirits[i]));
            nBeer += 1;
        }
        else if(nWhiskey < 100 && DB2.spirits[i].varugrupp.includes("Whisky"))
        {
            whiskeyDrinks.push(filterDrinkInfo(DB2.spirits[i]));
            nWhiskey += 1;
        }
        else if(nWine < 100 && DB2.spirits[i].varugrupp.includes("Vin"))
        {
            wineDrinks.push(filterDrinkInfo(DB2.spirits[i]));
            nWine += 1;
        }
    }
}

//========================================================================================================
/*  This function takes a drink object as a parameter and return a new object that are filtered out some
 * unnecessary fields.
 */
function filterDrinkInfo(drinkObj) {
    var newDrinkObj = {};

    // get No.
    newDrinkObj.nr = drinkObj.nr;

    //get Article ID
    newDrinkObj.artikelid = drinkObj.artikelid;

    //get name 1
    newDrinkObj.namn = drinkObj.namn;

    //get name 2
    newDrinkObj.namn2 = drinkObj.namn2;

    //get pricing
    newDrinkObj.prisinklmoms = drinkObj.prisinklmoms;

    //get alcohol content
    newDrinkObj.alkoholhalt = drinkObj.alkoholhalt;

    return newDrinkObj;
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
            window.location.href ="pages/tables.html";
        } else if(credentialsCollect[userIndex] == 3){
            sessionStorage.setItem("vipUsername", usernameCollect[userIndex]);
            window.location.href ="pages/order-VIP.html";
        } else {
            window.location.href="pages/order.html";

        }
    }
    else{
        window.alert("Wrong username or password");
    }
    
}

//To search for specific drinks
function searchFunction(listToSearch){
    console.log("Searched");
    var input = document.getElementById("myInput");
    var filter = input.value.toLowerCase();
    var divs = document.getElementsByClassName('beverage');

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


