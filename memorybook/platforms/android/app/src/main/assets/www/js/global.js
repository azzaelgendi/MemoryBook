var slideIndex = 0;


function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (slides.length>0) {
    console.info(slides.length);

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); }// Change image every 3 seconds
}

function btnCapturePhotoEdit_click() {
    var image = $("#imgSnapEdit");
    image.prop("src","");
    captureEditablePhoto();
}

function btnLoadFromLibrary_click() {
    var image = $("#imgSnapEdit");
    image.prop("src","");
    loadFromPhotoLibrary();
}

function AEupdateMemory_click() {
    AEupdateMemory();
}

function AEAddMemory_click() {

        AEAddNext_click();

}

function AEdeleteMemory_click() {
    AEdeleteMemory();
    // $(location).prop('href', "#AEViewMemoryBookPage");
}

function show_settings() {
    $(location).prop('href', "#AEASettingPage");
}

function AEinitStorage() {
    var location = $("#AEDefaultlocation").val();
    localStorage.setItem("location", location);
    alert("Default location Saved  " + localStorage.getItem("location"));
}

function location_saved() {
    var location = localStorage.getItem("location");
    $("#AEAddLoc").val(location);

}

function init() {
    console.info("Dom is ready");
    showSlides();
    $("#AEAddNext").on("click", AEAddMemory_click);
    $("#AEAddMemoryPage").on("pageshow", AEAddMemoryType_dropdown);
    $("#AEViewMemoryBookPage").on("pageshow", AEshowMemory);
    $("#AEEditMemoryPage").on("pageshow", AEshowCurrentMemory);
    $("#AEClearDatabase").on("click", AEClearDatabase_click);
    $("#AEUpdate").on("click", AEupdateMemory_click);
    $("#AEDelete").on("click", AEdeleteMemory_click);
    $("#AECancel").on("click", cancel_click);
    $("#btnCapturePhotoEdit").on("click", btnCapturePhotoEdit_click);
    $("#btnLoadFromLibrary").on("click", btnLoadFromLibrary_click);
    $("#btnShowFile").on("click", btnShowFile_click);
    $("#btnCapturePhoto").on("click", btnCapturePhotoEdit_click);
    $("#btnLoadFromLibraryEdit").on("click", btnLoadFromLibrary_click);
    $("#btnShowFileEdit").on("click", btnShowFile_click);
    $("#AECalender").on("click", addToCalander);
    $("#AESaveDefault").on("click", AEinitStorage);
    $("#AESetting").on("click", show_settings)

}

function AEinitDB() {
    try {
        DB.AECreateDatabase();
        if (db) {
            DB.AECreateTables();
        }
        else {
            console.error("Error: Cannot create tables: Database does not exist");
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB(). Cannot proceed");
    }
}
//ready function
$(document).ready(function () {
    AEinitDB();
    init();
});

