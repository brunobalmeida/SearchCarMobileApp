

var db;

/**
 * General purpose error handler
 * @param tx The transaction
 * @param error The error object
 */
function errorHandler(tx, error){
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}

var DB = {
    createDatabase: function(){
        var shortName= "FindCar";
        var version = "1.0";
        var displayName = "FindYCar App";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating Database ...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess(){
            console.info("Success: Database created successfully.");
        }
    },
    createTables: function(){

        function txFunction(tx) {
            console.info("Creating table: friend");
            var sql = "CREATE TABLE IF NOT EXISTS info(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name  VARCHAR(50) NOT NULL," +
                "address VARCHAR(75) NOT NULL," +
                "city VARCHAR(25) NOT NULL," +
                "phoneNumber VARCHAR(15) NOT NULL," +
                "email VARCHAR(50) NOT NULL," +
                "make VARCHAR(20) NOT NULL," +
                "model VARCHAR(20) NOT NULL," +
                "year VARCHAR(5) NOT NULL," +
                "link VARCHAR(100));";

            var options = [];

            function successCreate(){
                console.info("Success: Create table: info successful.");
            }

            tx.executeSql(sql, options, successCreate, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Create tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction );
    },
    dropTables: function(){
        
        function txFunction(tx){
            var sql = "DROP TABLE IF EXISTS info;";
            var options = [];
            
            function successDrop() {
                console.info("Success: info table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler );
        }
        
        function successTransaction(){
            console.info("Success: Drop tables transaction successful");
        }
        
        db.transaction(txFunction, errorHandler, successTransaction);
    }

};