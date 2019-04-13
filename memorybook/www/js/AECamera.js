/**
 * File Name: AECamera.js
 *
 * Revision History:
 *       Azza Elgendy, 2019-04-07 : Created
 */
function captureEditablePhoto() {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true
    };

    function onSuccess(imageData) {
        var image = $("#imgSnap");
        image.prop("src", "data:image/jpeg;base64," + imageData);
    }

    function onFail(error) {
        alert("Failed because : " + error.message);
    }

    navigator.camera.getPicture(onSuccess, onFail, options);

}
function loadFromPhotoLibrary() {
    var options = {
        quality: 50,
        allowEdit: true,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    };

    function onSuccess(imageData) {
        var image = $("#imgSnap");
        image.prop("src", "data:image/jpeg;base64," + imageData);
    }

    function onFail(error) {
        alert("Failed because : " + error.message);
    }

    navigator.camera.getPicture(onSuccess, onFail, options);
}
function getFileName() {

    var fname = "img\\" + "winter2.jpg";
    // console.info(fname);
    $("#imgSnap").attr("src", fname);

    return fname;


}

function btnShowFile_click() {
    getFileName();
}