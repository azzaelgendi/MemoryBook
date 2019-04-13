/**
 * File Name: AEutil.js
 *
 * Revision History:
 *       Azza Elgendy, April4th,2019 : Created
 */
//add validation to add memory page
function AEdoValidate_AEAddForm() {
    var form = $("#AEAddFrm");
    form.validate({
        rules: {
            AEAddTitle: {
                required: true,
                minlength: 3
            },
            AEAddLoc: {
                required: true,
                minlength: 3
            },
            AEAddNotes: {
                required: true,
                minlength: 10
            },
            AEAddmemoryDate: {
                required: true
            }
        },
        messages: {
            AEAddTitle: {
                required: "You must enter the name",
                minlength: "Name must be at least 3 characters long"
            },
            AEAddLoc: {
                required: "You must enter the location",
                minlength: "Name must be at least  characters long"
            },
            AEAddNotes: {
                required: "You must enter the notes",
                minlength: "Name must be at least 10 characters long"
            },
            AEAddmemoryDate: {
                required: "Please Enter a date"
            }
        }
    });
    return form.valid();
}

//add validation to edit memory page
function AEdoValidate_AEEditForm() {
    var form = $("#AEEditFrm");
    form.validate({
        rules: {
            AEEditTitle: {
                required: true,
                minlength: 3
            },
            AEEditLoc: {
                required: true,
                minlength: 3
            },
            AEEditNotes: {
                required: true,
                minlength: 10
            },
            AEEditmemoryDate: {
                required: true
            }
        },
        messages: {
            AEEditTitle: {
                required: "You must enter the name",
                minlength: "Name must be at least 3 characters long"
            },
            AEEditLoc: {
                required: "You must enter the location",
                minlength: "Name must be at least  characters long"
            },
            AEEditNotes: {
                required: "You must enter the notes",
                minlength: "Name must be at least 10 characters long"
            },
            AEEditmemoryDate: {
                required: "Please Enter a date"
            }
        }
    });
    return form.valid();
}