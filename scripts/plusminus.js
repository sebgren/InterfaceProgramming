//========================================================================================================
/*  This function is called when the plus button (in Tab) is clicked
 */
function plusQuantity(element) {
    var id = element.id;
    // console.log(id);
    var matchedString = id.match(/tab\-item\-(\w+)\-(\d+)\-.*/);

    var type = matchedString[1];
    var drinkId = matchedString[2];
    var itemId = type + "-" + drinkId;

    console.log("Type " + type);
    console.log("Drink id " + drinkId);
  
    var itemsInTab = JSON.parse(localStorage.getItem("itemsInTab"));

    for(var index in itemsInTab.items)
    {
        var item = itemsInTab.items[index];

        if(item.id === itemId)
        {
            itemsInTab.items[index].quantity += 1;
        } 
    }

    localStorage.setItem("itemsInTab", JSON.stringify(itemsInTab));

    updateItemQuantityInTab();
}


//========================================================================================================
/*  This function is called when the minus button (in Tab) is clicked
 */
function minusQuantity(element) {
    var id = element.id;
    // console.log(id);
    var matchedString = id.match(/tab\-item\-(\w+)\-(\d+)\-.*/);

    var type = matchedString[1];
    var drinkId = matchedString[2];
    var itemId = type + "-" + drinkId;

    console.log("Type " + type);
    console.log("Drink id " + drinkId);
  
    var itemsInTab = JSON.parse(localStorage.getItem("itemsInTab"));

    for(var index in itemsInTab.items)
    {
        var item = itemsInTab.items[index];

        if(item.id === itemId)
        {
            var oldQuantity = itemsInTab.items[index].quantity;
            itemsInTab.items[index].quantity = (oldQuantity-1) < 0 ? 0 : (oldQuantity-1);
        } 
    }

    localStorage.setItem("itemsInTab", JSON.stringify(itemsInTab));

    updateItemQuantityInTab();
}

//========================================================================================================
/*  This function updates the price corresponding to the params idQuery (the string for querying) and 
 * newPrice (the new price to be updated to).
 */
function updatePrice(idQuery, newPrice) {
    $(idQuery).text(newPrice.toString());
}