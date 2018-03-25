$(document).on('page:init', '.page[data-name="profile"]', function (e) {
	jq(document).ready(function () {
		jq(".no-submit").submit(function () {
		return false;
	});
	jq("#btn-change_password").click(function () { 
		if(profile.validatePasswordUpdate())
		profile.updatePassword(); 
	});
	jq("#btn-update_details").click(function () {
		profile.updateDetails();
	});
	});
});


/** PROFILE NAMESPACE
 ======================================== */

var profile = {};

/**
 * Updates user password.
 */
profile.updatePassword = function() {
        //turn on button loading state
        asengine.loadingButton(jq("#change_password"), jq_lang.updating);
    
        //encrypt passwords before sending them through the network
	var newPass = CryptoJS.SHA512(jq("#new_password").val()).toString();
	var oldPass = CryptoJS.SHA512(jq("#old_password").val()).toString();
        
        //send data to server
	jq.ajax({
		url: "http://songlister.nfshost.com/as/ASEngine/ASAjax.php",
		type: "POST",
		data: {
			action	 : "updatePassword",
			oldpass  : oldPass,
			newpass  : newPass,
			loginsource : 'cordova'
		},
		success: function (result) {
                        //return button to normal state
                        asengine.removeLoadingButton(jq("#change_password"));
                        
			if(result == "") {
                                //display success message
				asengine.displaySuccessMessage(
                                        jq("#form-changepassword"),
                                       	jq_lang.password_updated_successfully
                                    );
			}
			else {
                                //display error message
				asengine.displayErrorMessage(jq("#old_password"), result);
			}
		}
	});
};


/**
 * Validate password update form.
 * @returns {Boolean} TRUE if form is valid, FALSE otherwise.
 */
profile.validatePasswordUpdate = function () {
    
        //remove all error messages if there are some
	asengine.removeErrorMessages();
	
        //get all data from form
	var oldpass  = jq("#old_password"),
            newpass  = jq("#new_password"),
            confpass = jq("#new_password_confirm"),
            valid    = true;
		
        //check if field is empty
	if(jq.trim(oldpass.val()) == "") {
		valid = false;
		asengine.displayErrorMessage(oldpass, jq_lang.field_required);
	}
	
        //check if field is empty
	if(jq.trim(newpass.val()) == "") {
		valid = false;
		asengine.displayErrorMessage(newpass, jq_lang.field_required);
	}

    if(jq.trim(newpass.val()).length <= 5) {
        valid = false;
        asengine.displayErrorMessage(newpass, jq_lang.password_length);
    }
	
        //check if field is empty
	if(jq.trim(confpass.val()) == "") {
		valid = false;
		asengine.displayErrorMessage(confpass, jq_lang.field_required);
	}
	
        //check if password and confirm new password are equal
	if(jq.trim(confpass.val()) != jq.trim(newpass.val()) ) {
		valid = false;
		asengine.displayErrorMessage(newpass);
		asengine.displayErrorMessage(confpass, jq_lang.password_dont_match);
	}
	
	return valid;
	
};


/**
 * Updates user details.
 */
profile.updateDetails = function () {
        //remove error messages if there are any
	//asengine.removeErrorMessages();
        
        //turn on button loading state
        //asengine.loadingButton(jq("#update_details"), jq_lang.updating);
        
        //prepare data that will be sent to server
	var data = {
		action : "updateDetails",
		details: {
			first_name: jq("#first_name").val(),
			last_name : jq("#last_name").val(),
			address	  : jq("#address").val(),
			phone	  : jq("#phone").val()
		},
		loginsource : 'cordova' // Skip CRSF check from phonegap logins. 
	};
        
        //send data to server
	jq.ajax({
		url: "http://songlister.nfshost.com/as/ASEngine/ASAjax.php",
		type: "POST",
		data: data,
		success: function (result) {
                        //return button to normal state
                        //asengine.removeLoadingButton(jq("#update_details"));
                        
			if(result == "") {
				//asengine.displaySuccessMessage(jq("#form-details"),jq_lang.details_updated);
				console.log("Profile Updated");
			}
			else {
                //display error messages
				console.log(result);
				//asengine.displayErrorMessage(jq("#form-details input"));
				//asengine.displayErrorMessage(
                    //jq("#phone"), 
                    //jq_lang.error_updating_db
                //);
			}
		}
	});
};
