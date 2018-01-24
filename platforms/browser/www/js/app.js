// Dom7
var $$ = Dom7;

// Theme
var theme = 'ios';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'com.songsmithkaraoke.songlister-client',
  root: '#myApp',
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
  console.log("Device is ready!");
});

