/**
 * File Name: AEDAL.js
 *
 * Revision History:
 *       Azza Elgendy, Apri2nd : Created
 *       April 7th :Edited
 */
// Memory table CRUD
var Memory = {
    AEinsert: function (options, callback) {

        function txFunction(tx) {
            var sql = "INSERT INTO memory(title, typeId, location, note" +
                ",memoryDate,photo) VALUES(?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    AEupdate: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE memory SET title=?, typeId=?, location=?, note=?" +
                ", memoryDate=?, photo=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    AEdelete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM memory WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    AEselect: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM memory WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);

    },
    AEselectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM memory;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("SelectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};


//type table selectAll
var Type = {
    AEselectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM type;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("SelectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
};
