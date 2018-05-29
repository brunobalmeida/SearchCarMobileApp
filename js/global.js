

function btnCalculate_click() {
    showCalculatedAge();
}

function btnAdd_click() {
    addFriend();
}

function btnExtra_click() {
    testValidation();
}

function btnClearDatabase_click() {
    clearDatabase();
}

function btnUpdate_click() {
    updateFriendEnemy();
}

function btnDelete_click() {
    deleteFriendEnemy();
}

function btnShowAll_click() {
    showAllFriendsEnemies();
}
function btnShowOne_click() {
    showOneFriendEnemy();
}

function pageFriends_show() {
    showAllFriendsEnemies();
}

function pageDetail_show() {
    showOneFriendEnemy();
}

function init() {
    $("#btnCalculate").on("click", btnCalculate_click);
    $("#txtDOBAdd").on("change", btnCalculate_click);
    $("#btnAdd").on("click", btnAdd_click);
    $("#btnExtra").on("click", btnExtra_click);
    $("#btnClearDatabase").on("click", btnClearDatabase_click);

    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnDelete").on("click", btnDelete_click);
    $("#btnShowAll").on("click", btnShowAll_click);
    $("#btnShowOne").on("click", btnShowOne_click);

    $("#pageFriends").on("pageshow", pageFriends_show);
    $("#pageDetail").on("pageshow", pageDetail_show);

}

function initDB(){
    try{
        DB.createDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.createTables();
        }
        else{
            console.error("Error: Cannot create tables: Database does not exist!");
        }
    } catch(e){
        console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
    }
}

$(document).ready(function () {
    init();
    initDB();
});
