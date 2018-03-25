$(document).on('page:init', '.page[data-name="register"]', function (e) {
    jq(document).ready(function () {
        //button register click
        jq("#btn-register").click(function () {
            if(register.validateRegistration() === true) {
                //validation passed
                var regMail     = jq("#reg-email").val(),
                    regUser     = jq("#reg-username").val(),
                    regPass     = jq("#reg-password").val(),
                    regPassConf = jq("#reg-repeat-password").val()
                    
                //create data that will be sent to server
                var data = { 
                    userData: {
                        email           : regMail,
                        username        : regUser,
                        password        : regPass,
                        confirm_password: regPassConf
                    },
                    fieldId: {
                        email           : "reg-email",
                        username        : "reg-username",
                        password        : "reg-password",
                        confirm_password: "reg-repeat-password"
                    }
                };
                
                //send data to server
                register.registerUser(data);
            }                        
        });
    });
});



/** REGISTER NAMESPACE
 ======================================== */

var register = {};


/**
 * Registers new user.
 * @param {Object} data Register form data.
 */
register.registerUser = function (data) {
    //get register button
    var btn = jq("#btn-register");
    
    //put button to loading state
    //asengine.loadingButton(btn, $_lang.creating_account);
    
    //hash passwords before send them through network
    data.userData.password = CryptoJS.SHA512(data.userData.password).toString();
    data.userData.confirm_password = CryptoJS.SHA512(data.userData.confirm_password).toString();
    
    //send data to server
    jq.ajax({
        url: "http://songlister.nfshost.com/as/ASEngine/ASAjax.php",
        type: "POST",
        data: {
            action  : "registerUser",
            user    : data,
            loginsource : "cordova"
        },
        success: function (res) {
            //return button to normal state
            //asengine.removeLoadingButton(btn);
            console.log('successful register');
            if(res.status === "error") {
                //error
                
                //display all errors
                /*for(var i=0; i<res.errors.length; i++) {
                    var error = res.errors[i];
                    asengine.displayErrorMessage($("#"+error.id), error.msg);
                }*/
                $("#error-messages").html("Error Registering");
            }
            else {
                // redirect to login
                app.router.navigate("/login/");
            }
        }
    });
};


/**
 * Validate registration form.
 * @returns {Boolean} TRUE if form is valid, FALSE otherwise.
 */
register.validateRegistration = function () {
    var valid = true;
    
    //remove previous error messages
    //asengine.removeErrorMessages();
    
    
    //check if all fields are filled
    jq(".register-form").find("input").each(function () {
        var el = jq(this);

        if(jq.trim(el.val()) === "") {
            //asengine.displayErrorMessage(el);
            valid = false;
        }
    });

    //get email, password and confirm password for further validation
    var regMail     = $("#reg-email"),
        regPass     = $("#reg-password"),
        regPassConf = $("#reg-repeat-password");
    
    //check if email is valid
    if(!asengine.validateEmail(regMail.val()) && regMail.val() != "") {
        valid = false;
        //asengine.displayErrorMessage(regMail,$_lang.email_wrong_format);
    }

    //check if password and confirm password fields are equal
    if(regPass.val() !== regPassConf.val() && regPass.val() != "" && regPassConf.val() != "") {
        valid = false;
        //asengine.displayErrorMessage(regPassConf, $_lang.passwords_dont_match);
    }

    //check password length
    if(jq.trim(regPass.val()).length <= 5) {
        valid = false;
        //asengine.displayErrorMessage(regPass, $_lang.password_length);
    }

    return valid;
};