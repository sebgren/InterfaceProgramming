//========================================================================================================
/*  This function is called when a beverage is dropped on the Tab
 */
function itemsOnDrop(event) {
    var id = localStorage.getItem("draggedId");
    var name = localStorage.getItem("draggedName");

    addDraggedItemToTab(id, name);
}

//========================================================================================================
/*  This function is called when a beverage is dragged over the Tab
 */
function itemsOnDragOver(event) {
    event.preventDefault();  
    event.stopPropagation();
        
    // console.log("drag over");
}

//========================================================================================================
/*  This function is called when the dragged beverage enters the Tab
 */
function itemsOnDragEnter(event) {
    event.preventDefault();  
    event.stopPropagation();
        
    // console.log("drag enter");
}

//========================================================================================================
/*  This function is called when the dragged beverage leaves the Tab
 */
function itemsOnDragLeave(event) {
    event.preventDefault();  
    event.stopPropagation();
        
    // console.log("drag leave");
}

//========================================================================================================
/*  This function adds the dragged beverage to the Tab. It gets the Id and the name of that beverage.
 */
function addDraggedItemToTab (id, name) {
    console.log("id " + id);
    var noItemsInTab = localStorage.getItem("noItemsInTab");

    if(noItemsInTab == null) 
        noItemsInTab = 1;
    else
    {
        noItemsInTab = noItemsInTab + 1;
        localStorage.setItem("noItemsInTab", noItemsInTab);
    }

    var currentNumber = noItemsInTab - 1;
    var matchedString = id.match(/(\w+)\-(\d+)/);
    var type = matchedString[1];
    var drinkId = matchedString[2];

    console.log("Type " + type);
    console.log("drinkId " + drinkId);

    $("#items").append(`
        <li id="item-`+ currentNumber +`-`+type+`-`+drinkId+`" class="tab-item">
            <img class="float-left tab-item-img" src="../images/`+type+`.jpg" width="50px" height="50px">
            <div class="float-left tab-item-name"><p>`+name+`</p></div>
            <div class="float-left tab-item-control">
                <input id="item-`+drinkId+`-plus" type="button" value="+" onclick="plusQuantity(this)">
                <span id="item-`+drinkId+`-quantity">1</span>
                <input id="item-`+drinkId+`-minus" type="button" value="-" onclick="minusQuantity(this)">
            </div>
            <p id="item-`+drinkId+`-price" class="float-left tab-item-price">100</p>
            <p id="item-`+drinkId+`-currency" class="float-left tab-item-currency">SEK</p>
        </li>
    `);
}