$(document).on('page:init', '.page[data-name="login"]', function (e) {
 	//catch form submit
 	jq("#login-form").submit(function () {
    	return false;
    });
 	

    //button login click
    jq("#btn-login").click(function () {
        console.log("login button clicked");
        var  un    = jq("#login-username"),
             pa    = jq("#login-password");

       //validate login form
       if(login.validateLogin(un, pa) === true) {
           console.log("login validated"); 
           //validation passed, prepare data that will be sent to server
            var data = {
                username: un.val(),
                password: pa.val(),
                id: {
                    username: "login-username",
                    password: "login-password"
                }
            };
            
            //send login data to server
            console.log("login data:"); console.log(data);
            login.loginUser(data);
       }

    });


    //set focus on username field when page is loaded
    //jq("#login-username").focus();
});


/** LOGIN NAMESPACE
 ======================================== */
var login = {};

login.loginUser = function (data) {
    var btn = jq("#btn-login");
    //asengine.loadingButton(btn, $_lang.logging_in);

    //encrypt password before sending it through the network
    data.password = CryptoJS.SHA512(data.password).toString();

    jq.ajax({
        url: "http://songlister.nfshost.com/as/ASEngine/ASAjax.php",
        type: "POST",
        dataType: "json",
        data: {
            action  : "checkLogin",
            username: data.username,
            password: data.password,
            id      : data.id,
            loginsource : 'cordova' // Skip CRSF check from phonegap logins. 
        },
        success: function (result) {
           //asengine.removeLoadingButton(btn);
           if( result.status === 'success' ) {
               //window.location = result.page;
               console.log("login success");
               //jq(document).trigger("successfullogin");
               //app.emit("successfullogin");
               app.router.navigate("/starting-news/");
           }
           else {
               console.log("login failed");
               //app.dialog.alert("login failed", "login failed");
               //asengine.displayErrorMessage(jq("#login-username"));
               //asengine.displayErrorMessage(jq("#login-password"), result.message);
           }

        }
    });
};

login.validateLogin = function (un, pass) {
    var valid = true;

    //remove previous error messages
    asengine.removeErrorMessages();

    if(jq.trim(un.val()) == "") {
        //asengine.displayErrorMessage(un);
        valid = false;
    }
    if(jq.trim(pass.val()) == "") {
       // asengine.displayErrorMessage(pass);
        valid = false;
    }

    return valid;
};