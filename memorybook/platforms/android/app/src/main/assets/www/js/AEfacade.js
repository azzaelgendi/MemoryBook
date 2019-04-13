/**
 * File Name: AEfacade.js
 *
 * Revision History:
 *       Azza Elgendy, April 7th : Created
 *       Edited
 */
// function to clear the database
function AEClearDatabase_click() {
    var result = confirm("Do you really want to clear the database?");
    if (result) {
        try {
            DB.AEdropTables();
            alert("Database cleared!");
        } catch (e) {
            alert(e);
        }
    }
}

//add Memory back if validation passed
function AEAddNext_click() {
    // Step 1: Test validation
    if (AEdoValidate_AEAddForm()) {
        console.info("Validation is successful");

        var title = $("#AEAddTitle").val();
        var location = $("#AEAddLoc").val();
        var notes = $("#AEAddNotes").val();
        var typeId = $("#AEAddMemoryType").prop("selectedIndex");
        var date = $("#AEAddmemoryDate").val();
        var img = document.getElementById("imgSnap");

        var canvas = document.getElementById('canvas');

        var dataURL;


        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        ctx.drawImage(img, 0, 0);

        dataURL = canvas.toDataURL("image/png");
        dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

        // alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));


        var opt = [title, typeId, location, notes, date, dataURL];

        //3. insert into table (by calling insert DAL function and supplying input values
        function callback() {
            console.info("Review inserted successfully");
        }

        Memory.AEinsert(opt, callback);
        // AEShowSlides();
        var image = $("#imgSnap");
        image.prop("src","");
        alert("New memory added");
        $(location).prop('href', '#AEViewMemoryBookPage');


    }
    else {
        console.error("Validation failed");
    }

    $(location).prop('href', "#AEViewMemoryBookPage");
}

//fill the dropdown of type table
function AEAddMemoryType_dropdown() {
    location_saved();
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        // results.rows.length gets the length
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            // Appending all the "options" inside the html code
            htmlCode +=
                "<option value=" + row['name'] + ">" + row['name'] + "</option>";
        }

        var select = $("#AEAddMemoryType");
        select = select.html(htmlCode);

        select.prop("selectedIndex", 2);
        select.selectmenu("refresh");


    }

    Type.AEselectAll(options, callback);
}

function AEEditMemoryType_dropdown() {

    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        // results.rows.length gets the length
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            // Appending all the "options" inside the html code
            htmlCode +=
                "<option value=" + row['name'] + " >" + row['name'] + "</option>";
        }
        var select = $("#AEEditMemoryType");
        select = select.html(htmlCode);
    }

    Type.AEselectAll(options, callback);

}

//show review list fetched from the table in database
function AEshowMemory() {

    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        // results.rows.length gets the length
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            // Appending all the "li" inside the html code
            htmlCode += "<li>" +
                "<a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h2>Your Memory Title: " + "</h2>" + "<p>" + row['title'] + "</p>" +
                "<h3>location: </h3>" + "<p>" + row['location'] + "</P>" +
                "<h3>Memory Details:</h3>" + "<p>" + row['note'] + "</p>" +
                "<h3>" + "Date: " + "</h3>" + "<p>" + row['memoryDate'] + "</p>" +
                "</a>" +
                "</li>";
        }
        var lv = $("#AEMemoryList");
        lv = lv.html(htmlCode);

        // VERY IMPORTANT
        lv.listview("refresh");

        // A function callback
        function clickHandler() {

            localStorage.setItem("id", $(this).attr("data-row-id"));

            //  navigating to a different page
            $(location).prop('href', '#AEEditMemoryPage');
        }

        // All the anchors descendant of this id will work this way
        $("#AEMemoryList a").on("click", clickHandler);
    }

    Memory.AEselectAll(options, callback);
}

//Show the current review
function AEshowCurrentMemory() {
    AEEditMemoryType_dropdown();
    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];
        var editType = $("#AEEditMemoryType");
        editType.prop("selectedIndex", row['typeId']);
        editType.selectmenu("refresh");

        $("#AEEditLoc").val(row['location']);
        $("#AEEditTitle").val(row['title']);
        $("#AEEditmemoryDate").val(row['memoryDate']);
        $("#AEEditNotes").val(row['note']);
        var img = document.getElementById("imgSnapEdit");
        img.src = row['photo'];

    }
    Memory.AEselect(options, callback);
}

//this to update the current review
function AEupdateMemory() {

    if (AEdoValidate_AEEditForm()) {
        var id = localStorage.getItem("id");

        console.info("Validation is successful");
        var title = $("#AEEditTitle").val();
        var location = $("#AEEditLoc").val();
        var notes = $("#AEEditNotes").val();
        var typeId = $("#AEEditMemoryType").prop("selectedIndex");
        var date = $("#AEEditmemoryDate").val();
        var img = document.getElementById("imgSnapEdit");
        var canvas = document.getElementById('canvasEdit');

        var dataURL;


        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        ctx.drawImage(img, 0, 0);

        dataURL = canvas.toDataURL("image/png");
        dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        // alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));

        var options = [title, typeId, location, notes, date, dataURL, id];


        function callback() {
            console.info("Record updated successfully");
        }

        Memory.AEupdate(options, callback);

        alert("your memory updated successfully");
       // AEShowSlides();
        var image = $("#imgSnapEdit");
        image.prop("src","");
        $(location).prop('href', '#AEViewMemoryBookPage');


    }
    else {
        console.error("Validation failed");
    }


}

function AEShowSlides() {

    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlCode += "<div class='mySlides fade'>" +
                "<img  alt='slideShow' src=" + row['photo'] + ">" +
                "</div>";
        }
        var lv = $(".slideshow-container");
        lv = lv.html(htmlCode);

    }

    Memory.AEselectAll(options, callback);

}

function AEdeleteMemory() {

    var id = localStorage.getItem("id");
    var options = [id];


    function callback() {
        console.info("Memory deleted successfully");
    }

    Memory.AEdelete(options, callback);

    alert("Memory deleted successfully");
    $(location).prop('href', '#AEViewMemoryBookPage');

}

function cancel_click() {
    $(location).prop('href', "#AEViewMemoryBookPage");

}