
function doValidate_frmAddInfo() {
    var form = $("#frmAddInfo");
    form.validate({
        rules:{
            txtNameAdd:{
                required: true,
            },
            txtAddress:{
                required: true,
            },
            txtCity:{
                required: true,
            },
            txtPhoneNumber: {
                required: true,
                phonenumbercheck: true
            },
            txtEmail:{
                required: true,
                emailcheck: true
            },
            txtMake:{
                required: true
            },
            txtModel:{
                required: true
            },
            txtYear:{
                required: true,
                numberLengthCheck: true
            }

        },
        messages:{
            txtNameAdd:{
                required: "The name is required"
            },
            txtAddress:{
                required: "The address is required"
            },
            txtCity:{
                required: "The city is required"
            },
            txtPhoneNumber: {
                required: "The phone number is required"
            },
            txtEmail:{
                required: "The email is required"
            },
            txtMake:{
                required: "The make is required"
            },
            txtModel:{
                required: "The model is required"
            },
            txtYear:{
                required: "The year is required"
            }
        }
    });
    return form.valid();
}


jQuery.validator.addMethod("emailcheck",
    function (value, element) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return this.optional(element) || regex.test(value);
    },
    "Must be a valid email format: ex.: you@email.com");


jQuery.validator.addMethod("phonenumbercheck",
    function (value, element) {
        var regex = /^(\()?\d{3}(\))?(-)?\d{3}(-)\d{4}$/;
        return this.optional(element) || regex.test(value);
    },
    "Must be a valid phone number format: ex.: (222)222-2222");

jQuery.validator.addMethod("numberLengthCheck",
    function (value) {
        var number = value;
        if (number >= 1900 && number <= 2019) {
            return true;
        }
        else {
            return false;
        }
    },
    "Value must be between 1901 and 2018");