//========================================================================================================
/* Author: Sy Hung Doan, 2019 
 *  This function is called when a beverage is dropped on the Tab
 */
function itemsOnDrop(event) {
    var id = localStorage.getItem("draggedId");
    var name = localStorage.getItem("draggedName");

    addDraggedItemToTab(id, name);
}

//========================================================================================================
/* Author: Sy Hung Doan, 2019 
 *  This function is called when a beverage is dragged over the Tab
 */
function itemsOnDragOver(event) {
    event.preventDefault();  
    event.stopPropagation();
        
    // console.log("drag over");
}

//========================================================================================================
/* Author: Sy Hung Doan, 2019 
*  This function is called when the dragged beverage enters the Tab
 */
function itemsOnDragEnter(event) {
    event.preventDefault();  
    event.stopPropagation();
        
    // console.log("drag enter");
}

//========================================================================================================
/* Author: Sy Hung Doan, 2019 
 *  This function is called when the dragged beverage leaves the Tab
 */
function itemsOnDragLeave(event) {
    event.preventDefault();  
    event.stopPropagation();
        
    // console.log("drag leave");
}

//========================================================================================================
/* Author: Sy Hung Doan, 2019 
 *  This function adds the dragged beverage to the Tab. It gets the Id and the name of that beverage.
 */
function addDraggedItemToTab (id, name) {

    // default price for each beverage
    var defaultItemPrice = {"beerPrice": 50, "whiskeyPrice": 75, "winePrice": 100};

    // The pattern is (type)-(drinkId)
    // matchedStrings is an array of matched strings
    var matchedStrings = id.match(/(\w+)\-(\d+)/);

    // type of the dragged beverage
    var type = matchedStrings[1];

    // drinkId of the dragged beverage
    var drinkId = matchedStrings[2];

    // get the list of items from localStorage
    var itemsInTab = localStorage.getItem("itemsInTab");

    // structure of the object stored in localStorage
    /*
        {
            "items": [
                {
                    "id" : "beer-1",
                    "quantity": 1,
                    "price": 50
                },

                {
                    "id": "whiskey-2",
                    "quantity": 1,
                    "price": 75
                },

                {
                    "id": "wine-3",
                    "quantity": 1,
                    "price": 100
                }
            ]
        }
    */

    // Parse the list of items 
    if(itemsInTab == null) 
        itemsInTab = {"items" : []};
    else
    {
        itemsInTab = JSON.parse(itemsInTab);
    }

    // Current number of items in Tab
    var numberOfItems = Object.keys(itemsInTab.items).length;

    // Should the dragged beverage be appended to Tab ?
    var shouldAppend = true;

    // If there're currently no items, then append it
    if(numberOfItems == 0) 
    {   
        shouldAppend = true;
    }
    else
    {
        for(var tempItem of itemsInTab.items)
        {
            // If the item is already in the list, then not append it
            if(tempItem.id === id)
            {
                // update the quantity of that item
                var item = tempItem;
                item.quantity += 1;
                shouldAppend = false;
                break;
            }
        }
    }

    if(shouldAppend)
    {
        // Create an item based on the id of the dragged beverage
        var item = {"id" : id, "quantity" : 1, "price": defaultItemPrice[type+"Price"]};

        // Push it to the list
        itemsInTab.items.push(item);
    }
    
    // Update the list of items in localStorage
    localStorage.setItem("itemsInTab", JSON.stringify(itemsInTab));

    // Append that item to the view
    if(shouldAppend)
    {
        $("#items").append(`
            <li id="tab-item-`+id+`" class="tab-item">
                <div class="tab-item-img">
                    <img src="../images/`+type+`.jpg">
                </div>
                <div class="tab-item-name">`+name+`</div>
                <div class="tab-item-control">
                    <input id="tab-item-`+id+`-minus" type="button" value="-" onclick="minusQuantity(this)">
                    <span id="tab-item-`+id+`-quantity">1</span>
                    <input id="tab-item-`+id+`-plus" type="button" value="+" onclick="plusQuantity(this)">
                </div>
                <div>
                    <span id="tab-item-`+id+`-price" class="tab-item-price">`+defaultItemPrice[type+"Price"]+`</span>
                    <span id="tab-item-`+id+`-currency" class="tab-item-currency">SEK</span>
                    <button id="tab-item-`+id+`-delete-button" type="button" onclick="deleteItemInTab(this);">&times;</button>
                </div>
            </li>
        `);
    }

    // Update the view
    updateTab();
}

//========================================================================================================
/* Author: Sy Hung Doan, 2019 
 *  This function updates the quantity and the total price for each item and the total price for the whole
 * list of items.
 */
function updateTab() {

    // Get the list of items from localStorage
    var items = JSON.parse(localStorage.getItem("itemsInTab")).items;

    var totalPrice = 0;

    for(var item of items)
    {
        var id = item.id;
        var quantity = item.quantity;
        var price = item.price;

        // Update the quantity of each item
        $("#tab-item-" + id + "-quantity").text(quantity);

        // Update the total price of each item
        $("#tab-item-" + id + "-price").text(price * quantity);

        totalPrice += quantity * price;
    }

    // Show the price section
    $("#section-price").show();

    // Update the total price of the whole list
    $("#total-price").text(totalPrice);
}