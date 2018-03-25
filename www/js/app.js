// Change jQuery symbol
var jq = jQuery.noConflict(true);

// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'com.brentmorris.songlister',
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
});



// Option 2. Using live 'page:init' event handlers for each page
$(document).on('page:init', '.page[data-name="login"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  /*console.log('login page loaded');
  $('#login-form').on('form:storedata', function (e) {
      console.log('data stored');
      var formData = app.form.convertToData('#login-form');
      console.log('data: ' + JSON.stringify(formData));

      
  }); */
})

$(document).on('page:init', '.page[data-name="news"]', function (e) {
  app.request.get('http://songlister.nfshost.com/as/news-block.php', function (data) {
    $('#news-content').html(data);
    console.log('Load news-content was performed');
  });  
})

$(document).on('page:init', '.page[data-name="profile"]', function (e) {
  app.request.get('http://songlister.nfshost.com/as/profile-block.php', function (data) {
    $('#profile-form ul').html(data);
    console.log('Load profile-form was performed');
  });  
})

$(document).on('page:init', '.page[data-name="login"]', function (e) {
  /*app.request.get('http://songlister.nfshost.com/as/news-block.php', function (data) {
    $('#ASDF').html(data);
    //console.log('Load was performed');
  });*/  
})

$(document).on('page:init', '.page[data-name="login"]', function (e) {
  $('#btn-logout').on('click', function(){
    app.request.get('http://songlister.nfshost.com/as/simple-logout.php', function (data) {});
  });  
})

$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // I DON'T KNOW WHY THIS NEVER ACTUALLY FIRES 
  //app.request.get('http://songlister.nfshost.com/phpinfo.php', function (data) {
  //  $('#testarea').html(data);
  //});    
})

$(document).on('page:init', '.page[data-name="add"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('add page loaded');
  $('.convert-form-to-data').on('click', function(){
    if ($('#add-song-form input[name="artistName"]').val() && $('#add-song-form input[name="songTitle"]').val() ) {
      var formData = app.form.convertToData('#add-song-form');
      alert(formData);

      if (songList.songs[0].songTitle == "Add a song") {
        //songList.songs.push(formData);
        songList.songs = new Array(formData);
        
      } else {
        songList.songs.push(formData);
      }
    
    $('#add-song-form input').val("");

    // store songList in local storage
    var dataToStore = JSON.stringify(songList);
    window.localStorage.setItem('songListData', dataToStore);

    // redirect back to my songs
    app.views.main.router.back('/my-songs/', {force: true, ignoreCache: true});
    }		
  });
})

$(document).on('page:init', '.page[data-name="add-more"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log('add more page loaded');
  $('.convert-form-to-data').on('click', function(){
    
    if ($('#add-song-more-form input[name="artistName"]').val() && $('#add-song-more-form input[name="songTitle"]').val() ) {
      
      var formData = app.form.convertToData('#add-song-more-form');
      
      
      if (songList.songs[0].songTitle == "Add a song") {
        //songList.songs.push(formData);
        songList.songs = new Array(formData);
        
      } else {
        songList.songs.push(formData);
      }
    
    $('#add-song-more-form input').val("");

    // store songList in local storage
    var dataToStore = JSON.stringify(songList); 
    window.localStorage.setItem('songListData', dataToStore);

    // redirect back to my songs
    app.views.main.router.back('/my-songs/', {force: true, ignoreCache: true});
    }		
  });
})



var songListTemplate, compiledSongListTemplate;

function compileTemplateSongList() {
  songListTemplate = $('script#song-list-template').html();
  compiledSongListTemplate = Template7(songListTemplate).compile();
}

function printSongList () {
  var lsData = window.localStorage.getItem("songListData");
  if (lsData != null && lsData.length > 0) {
    
    songList = JSON.parse(lsData);
    
  } else {
    songList = {
      songs : [
          {
          "artistName": "Tap the + button",
          "songTitle": "Add a song",
          },
      ]
    }
  }
  
  //songList = JSON.parse(window.localStorage.getItem("songListData"));
  document.getElementById('songList').innerHTML = compiledSongListTemplate(songList);
  
}



$(document).on('page:init', '.page[data-name="my-songs"]', function (e) {
  console.log('my songs init');
  compileTemplateSongList();
  printSongList();
})

$(document).on('page:reinit', '.page[data-name="my-songs"]', function (e) {
  console.log('my songs reinit');
  compileTemplateSongList();
  printSongList();
})