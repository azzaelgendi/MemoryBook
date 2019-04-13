/**
 * File Name: AEdatabase.js
 *
 * Revision History:
 *       Azza Elgendy, April2nd : Created
 *
 */

var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + "): " + error.message);

}

// This var is an object
var DB = {

    // Whenever we create a function onside an object we follow this approach: "functionName: functionBody() {}"
    AECreateDatabase: function () {
        var shortName = "MemoryBookDB";
        var version = "1.0";
        var displayName = "DB for memoryBook app";
        var dbSize = 2 * 1024 * 1024; // this is a 2 MB estimated size

        function dbCreate() {
            console.info("Success: Database created successfully");
        }

        // openDatabase() creates a DB if it doesn't exist, or open it if it exists
        db = openDatabase(shortName, version, displayName, dbSize, dbCreate);
    },
    AECreateTables: function () {
        function txFunction(tx) {
            var options = [];
            var sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql, options, successCreate, errorHandler);

            sql = "CREATE TABLE IF NOT EXISTS type( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";
            tx.executeSql(sql, options, successCreate, errorHandler);

            sql = "INSERT INTO type (name) VALUES ('Family');";
            tx.executeSql(sql, options, successAdd, errorHandler);

            sql = "INSERT INTO type (name) VALUES ('Friends');";
            tx.executeSql(sql, options, successAdd, errorHandler);

            sql = "INSERT INTO type (name) VALUES ('Work');";
            tx.executeSql(sql, options, successAdd, errorHandler);

            sql = "INSERT INTO type (name) VALUES ('Holiday');";
            tx.executeSql(sql, options, successAdd, errorHandler);

            sql = "INSERT INTO type (name) VALUES ('Others');";
            tx.executeSql(sql, options, successAdd, errorHandler);


            function successAdd() {
                console.info("Records Added successfully");
            }

            sql = "CREATE TABLE IF NOT EXISTS memory( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "title VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "location VARCHAR(30)," +
                "note TEXT," +
                "memoryDate DATE," +
                "photo BLOB,"+
                "FOREIGN KEY(typeId) REFERENCES type(id));";
            tx.executeSql(sql, options, successCreate, errorHandler);

            function successCreate() {
                console.info("Table created successfully");
            }


        }

        function successTransaction() {
            console.info("Create table transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    AEdropTables: function () {
        function txFunction(tx) {
            var options = [];
            var sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql, options, AEsuccessDropType, errorHandler);
            sql = "DROP TABLE IF EXISTS memory;";
            tx.executeSql(sql, options, AEsuccessDropMemory, errorHandler);

            function AEsuccessDropMemory() {
                console.info("Table review dropped successfully");
            }

            function AEsuccessDropType() {
                console.info("Table type dropped successfully");
            }

        }

        function successTransaction() {
            console.info("Drop table transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

