//========================================================================================================
/*  This function is called when a delete button of an item in Tab is clicked. The item is removed from 
 * View and localStorage.
 */
function deleteItemInTab(element) {
    // Get id of the HTML element
    var id = element.id;

    // The pattern is tab-item-(type)-(drinkId)-...
    // matchedStrings is an array of matched strings
    var matchedStrings = id.match(/tab\-item\-(\w+)\-(\d+)\-.*/);

    // Get the type of that item
    var type = matchedStrings[1];

    // Get the drinkId of that item
    var drinkId = matchedStrings[2];

    // The Id of that item
    var itemId = type + "-" + drinkId;

    // Remove that item from view
    $("#" + element.parentNode.id).remove();

    // Get the list of items from localStorage
    var itemsInTab = JSON.parse(localStorage.getItem("itemsInTab"));

    for(var index in itemsInTab.items)
    {
        var item = itemsInTab.items[index];

        // Reach that item
        if(item.id === itemId)
        {
            // Remove that item from the list of items
            itemsInTab.items.splice(index, 1);
            break;
        } 
    }

    // Update the list of items
    localStorage.setItem("itemsInTab", JSON.stringify(itemsInTab));

    // Update the list of items in View
    updateTab();
}