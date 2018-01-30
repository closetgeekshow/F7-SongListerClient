// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
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

// Option 2. Using live 'page:init' event handlers for each page
$(document).on('page:init', '.page[data-name="login"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('login page loaded');
  $('#login-form').on('form:storedata', function (e) {
      console.log('data stored');
      var formData = app.form.convertToData('#login-form');
      console.log('data: ' + JSON.stringify(formData));
  }); 
})

$(document).on('page:init', '.page[data-name="add"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('add page loaded');
  $('.convert-form-to-data').on('click', function(){
	  
        var formData = app.form.convertToData('#add-song-form');
        alert(JSON.stringify(formData));
		
    });
})

var songListTemplate = $('script#song-list-template').html();
var compiledSongListTemplate = Template7.compile(songListTemplate);

$(document).on('page:init', '.page[data-name="my-songs"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('my songs loaded');
  var html = compiledSongListTemplate(songList);
})