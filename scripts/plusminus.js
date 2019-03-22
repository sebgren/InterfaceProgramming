//========================================================================================================
/* Author: Sy Hung Doan, 2019 
 *  This function is called when the plus button (in Tab) is clicked
 */
function plusQuantity(element) {
    // Get the id of the HTML element
    var id = element.id;
    
    // The pattern is tab-item-(type)-(drinkId)-...
    var matchedString = id.match(/tab\-item\-(\w+)\-(\d+)\-.*/);

    // Get the type of the item
    var type = matchedString[1];

    // Get the drinkId of the item
    var drinkId = matchedString[2];

    // Get the Id of the item
    var itemId = type + "-" + drinkId;

    // console.log("Type " + type);
    // console.log("Drink id " + drinkId);
  
    // Get the list of items from localStorage
    var itemsInTab = JSON.parse(localStorage.getItem("itemsInTab"));

    for(var index in itemsInTab.items)
    {
        var item = itemsInTab.items[index];

        if(item.id === itemId)
        {
            // Update the quantity of that item
            itemsInTab.items[index].quantity += 1;
        } 
    }

    // Update the list in localStorage
    localStorage.setItem("itemsInTab", JSON.stringify(itemsInTab));

    // Update view
    updateTab();
}


//========================================================================================================
/* Author: Sy Hung Doan, 2019 
 *  This function is called when the minus button (in Tab) is clicked
 */
function minusQuantity(element) {
    // Get the id of the HTML element
    var id = element.id;

    // The pattern is tab-item-(type)-(drinkId)-...
    var matchedString = id.match(/tab\-item\-(\w+)\-(\d+)\-.*/);

    // Get the type of the item
    var type = matchedString[1];

    // Get the drinkId of the item
    var drinkId = matchedString[2];

    // Get the Id of the item
    var itemId = type + "-" + drinkId;

    // console.log("Type " + type);
    // console.log("Drink id " + drinkId);
  
    // Get the list of items from localStorage
    var itemsInTab = JSON.parse(localStorage.getItem("itemsInTab"));

    for(var index in itemsInTab.items)
    {
        var item = itemsInTab.items[index];

        if(item.id === itemId)
        {
            // Get the old quantity of that item
            var oldQuantity = itemsInTab.items[index].quantity;

            // 0 is the smallest number that the quantity can be
            itemsInTab.items[index].quantity = (oldQuantity-1) < 0 ? 0 : (oldQuantity-1);
        } 
    }

    // Update the list in localStorage
    localStorage.setItem("itemsInTab", JSON.stringify(itemsInTab));

    // Update view
    updateTab();
}

//========================================================================================================
/* Author: Sy Hung Doan, 2019 
 *  This function updates the price corresponding to the params idQuery (the string for querying) and 
 * newPrice (the new price to be updated to).
 */
function updatePrice(idQuery, newPrice) {
    $(idQuery).text(newPrice.toString());
}