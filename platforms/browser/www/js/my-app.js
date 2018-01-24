// Initialize app
var mpApp = new Framework7({
    // App root element
    root: '#my-app',
    // App Name
    name: 'SongLister',
    // App id
    id: 'com.Songsmith.SongLister',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
    ],
    theme : 'ios'
    // ... other parameters
  });
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    iosdynamicnavbar: true,
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    $$('.something').on('click', function (e) {
        $$(this).addClass('hello').attr('title','world').insertAfter('.something-else');
    })

})

myApp.onPageInit('login', function(page) {
    // TODO: Insert login check/offline mode
})

myApp.onPageInit('news', function(page) {
    // TODO: Starting News check, insert back remove close
})

myApp.onPageInit('mainmenu', function(page) {
    // TODO: Starting News check, insert back remove close
})

myApp.onPageInit('add-song', function(page) {
    // TODO: Starting News check, insert back remove close
    $$('.convert-form-to-data').on('click', function(){
		alert('ding');
        var formData = myApp.form.convertToData('#add-song-form');
        alert(JSON.stringify(formData.name));
		
    });
})

myApp.onPageInit('profile', function(page) {
    // TODO: Load profile data from localstorage
    // IF Not load from server
    // If Offline leave blank

    // Check Update storage
   // console.log('profile page loaded');
    $$('#profile-form').on('form:storedata', function (e) {
        console.log('data stored');
        var formData = myApp.form.convertToData('#profile-form');
        console.log('data: ' + JSON.stringify(formData));
        alert('ding');
    }); 
})





// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

$$('.convert-form-to-data').on('click', function(){
	    var formData = myApp.form.convertToData('#add-song-form');
        alert(JSON.stringify(formData.name));
		
});




