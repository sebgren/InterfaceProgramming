//========================================================================================================
/*  This function is called when the plus button (in Tab) is clicked
 */
function plusQuantity(element) {
    var id = element.id;
    // console.log(id);
    var s = id.match(/item\-\d+/);
    // console.log(s[0]);
    $("#" + s + "-quantity").text(function(_, oldText) {
        var oldQuantity = parseInt(oldText);
        var newQuantity = oldQuantity + 1;

        updatePrice("#" + s + "-price", newQuantity * 100);

        return newQuantity.toString();
    });
}


//========================================================================================================
/*  This function is called when the minus button (in Tab) is clicked
 */
function minusQuantity(element) {
    var id = element.id;
    // console.log(id);
    var s = id.match(/item\-\d+/);
    // console.log(s[0]);
    $("#" + s + "-quantity").text(function(_, oldText) {
        var oldQuantity = parseInt(oldText);
        var newQuantity = (oldQuantity-1) < 0 ? 0 : (oldQuantity-1);

        updatePrice("#" + s + "-price", newQuantity * 100);

        return newQuantity.toString();
    });
}

//========================================================================================================
/*  This function updates the price corresponding to the params idQuery (the string for querying) and 
 * newPrice (the new price to be updated to).
 */
function updatePrice(idQuery, newPrice) {
    $(idQuery).text(newPrice.toString());
}