$(document).on('page:init', '.page[data-name="forgot-pass"]', function (e) {
    jq(document).ready(function () {
        //catch form submit
        jq("#forgot-pass-form").submit(function () {
            return false;
        });
        
        //Forgot password button click
        jq("#btn-forgot-password").click(function () {
            var email = jq("#forgot-password-email"),
                valid = true;

            //remove prevuious error messages
           // asengine.removeErrorMessages();

            //check if email is entered
            if(jq.trim(email.val()) === "") {
                valid = false;
                //asengine.displayErrorMessage(email);
            }

            //validate email format
            if(!asengine.validateEmail(email.val())) {
                valid = false;
                //asengine.displayErrorMessage(email, jq_lang.email_wrong_format);
            }

            //if email is valid, send reset password request to the server
            if(valid)
                passres.forgotPassword(email.val());

        });
        
        
        jq("#btn-reset-pass").click(function () {
            var np    = jq("#password-reset-new-password"),
            valid = true;
            
            if(jq.trim(np.val()) === "") {
                valid = false;
                //asengine.displayErrorMessage(np);
            }

            if(jq.trim(np.val()).length <= 5) {
                valid = false;
                //asengine.displayErrorMessage(np, jq_lang.password_length);
            }

            if(valid)
                passres.resetPassword(np.val());
            });
                        
    });
});

/** PASSWORD RESET NAMESPACE
 ======================================== */

var passres = {};

/**
 * Resets user's password.
 * @param {string} newPass New password.
 */
passres.resetPassword = function (newPass) {
    //get reset password button
    var btn = jq("#btn-reset-pass");
    
    //change button state to indicate working process
    asengine.loadingButton(btn, jq_lang.resetting);
    
    //hash password
    var pass = CryptoJS.SHA512(newPass).toString();
    
    //get confirmation key from url
    var key  = asengine.urlParam("k");
    
    //send data to server
    jq.ajax({
        url: "http://songlister.nfshost.com/as/ASEngine/ASAjax.php",
        type: "POST",
        data: {
            action  : "resetPassword",
            newPass : pass,
            key     : key,
            loginsource : "cordova"
        },
        success: function (result) {

            if ( result == '' )
            {
                //jq("#password-reset-form").trigger('reset');
                
                //Successful. Display success mesage.
                /*asengine.displaySuccessMessage(
                    jq("#password-reset-form fieldset"), 
                    jq_lang.password_updated_successfully_login
                );*/
                app.router.navigate("/login/");
            }
            else
            {   
                //Error. Display error mesage.
                /*asengine.displayErrorMessage(
                    jq("#password-reset-new-password"), 
                    result
                );*/
                $("#error-messages").html("<p>Email not found</p>");
            }

            //return button to normal state
            //asengine.removeLoadingButton(btn);
        }
    });
};


/**
 * Forgot password.
 * @param {string} userEmail User email needed for reseting password.
 */
passres.forgotPassword = function (userEmail) {
    //get forgot password button
    var btn = jq("#btn-forgot-password");
    
    //put button to working state
    //asengine.loadingButton(btn, jq_lang.working);
    
    //send data to server
    jq.ajax({
        url: "http://songlister.nfshost.com/as/ASEngine/ASAjax.php",
        type: "POST",
        data: {
            action  : "forgotPassword",
            email : userEmail,
            loginsource : "cordova"
        },
        success: function (result) {
            //display success message
            try {
                
                if(result == '') {

                    app.router.navigate("/login/");
                }
                else {
                    $("#error-messages").html("<p>Email not found</p>");
                }
            }
            catch (err) {
                  /*asengine.displayErrorMessage(
                        jq("#forgot-password-email"),
                        jq_lang.message_couldnt_be_sent
                    );*/
            }

            //return button to normal state
            //asengine.removeLoadingButton(btn);
           
        }
    });
};