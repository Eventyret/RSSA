// OOpens a http session
var getData = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  // If we have an error we would like to know what it is.
  xhr.onerror = function() {
    var status = xhr.status;
    if (status in [400, 404, 405]) {
      console.log('Request Failed with status ' + status);
    }
  };
  xhr.send();
};
var MovieListLoaded = false;
var SeriesListLoaded = false;

// - Original code from Bradtraversy https://github.com/bradtraversy/movieinfo
$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    var searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
  // End original code from Bradtraversy

  var moviesandtvshows = [];

  // Checking for movies and makes an array
  getData(RADARRURL, function(err, data) {
    if (err !== null) {
      MovieListLoaded = true;
    } else {
      moviesandtvshows.push({
        'movies': data
      });
      MovieListLoaded = true;
      searchIt();
      var max = data.length;
      var min = 0;
      var random = Math.floor(Math.random() * (max - min + 1)) +
        min;
      var randomID = data[random].imdbId;
      getData('https://webservice.fanart.tv/v3/movies/' +
        randomID + '?api_key=' + FANARTAPI,
        function(err, image) {

          if (err !== null || !image.moviebackground) {
            document.body.style.backgroundColor = '#3E4551';
          } else {
            max = image.moviebackground.length;
            random = Math.floor(Math.random() * (max - min +
              1)) + min;
            if (random >= max) {
              random = max - 1;
            }
            var randomIDurl = image.moviebackground[random]
              .url;
            $('body').css('background-image', 'url(' +
              randomIDurl + ')');
            $('body').addClass('randombg');
            sessionStorage.setItem('backgroundImageUrl',
              randomIDurl);
          }
        });
    }
    hideLoaderIfReady();
  });

  // Checking for series and adds to array
  getData(SONARRURL, function(err, data) {
    if (err !== null) {
      SeriesListLoaded = true;
      // If we have an error we would like to know what it is
      console.log('Something went wrong: ' + err);
    } else {
      moviesandtvshows.push({
        'series': data
      });
      SeriesListLoaded = true;
      searchIt();
    }
    hideLoaderIfReady();
  });

  this.data = moviesandtvshows;
});

// Checking that movies and series are loaded into array
function searchIt() {
  if (MovieListLoaded && SeriesListLoaded) {
    var searchFor = window.location.href.split('?q=');
    var searchQuery = searchFor[1];

    if (searchQuery !== null && searchFor.length > 1) {
      document.getElementById('searchText').value = decodeURI(
        searchQuery);
      getMovies(searchQuery);
    }
  }
}

// Loops checks if movie is in collection
function filterMovies(id) {
  var isDownloaded = false;
  this.data.forEach(function(type) {
    [type].forEach(function(entry) {
      $.each(entry, function(i, item) {
        $.each(item, function(x, y) {
          if (y.imdbId === id && y.sizeOnDisk >= 0) {
            isDownloaded = true;
          }
        });
      });
    });
  });
  return isDownloaded;
}

// Search Function - Original code from Bradtraversy https://github.com/bradtraversy/movieinfo
// Added my own code so it displays if the movie or series is in the collection or not.
function getMovies(searchText) {
  getData('https://www.omdbapi.com/?s=' + searchText, function(err,
    response) {
    if (err) {
      return;
    }
    if (response.Search) {
      var omdbData = response.Search;
      var output = '';
      $.each(omdbData, (index, movie) => {
        output += htmlWriteResults(movie);
      });

      $('#movies').html(output);
    } else {
      // If we can't find any results we give a nice error message.
      $('#movies').html(
        '<section><div class="col-md-12"><div class="well text-center"><br><i class="fa fa-exclamation-triangle fa-4x whiteheader"></i><h2 class="whiteheader">Sorry, but <b>' +
        searchText +
        '</b> gave no results</h2><br><p class="whiteheader">But we would  <i class="fa fa-heart" style="color:red;"> </i>  for you to try something else.</p></div></div></section>'
      );
    }
  });
}

// Writes the Search Results  - Original code from Bradtraversy https://github.com/bradtraversy/movieinfo
// Added the buttons to display if the result is in your collection or not-
function htmlWriteResults(cases) {
  var myHTML = '';
  myHTML +=
    `<article><div class="col-md-4">
            <div class="well text-center">`;
  if (filterMovies(cases.imdbID)) {
    myHTML +=
      `<div class="alert alert-success" id="${cases.imdbID}inCollection"><p><i class="fa fa-cloud-download"></i> In Collection</p></div>`;
  } else {
    myHTML +=
      `<div class="alert alert-danger" id="${cases.imdbID}notInCollection"><p><i class="fa fa-exclamation-triangle"></i> Not in Collection</p></div>`;
  }
  myHTML +=
    `<figure><img src="${posterError(cases.Poster)}" alt="${cases.Title}" class="img-responsive"></figure>
              <h5 class="whiteheader">${cases.Title} (${cases.Year.substring(0, 4)})</h5>
                <div class="btn-group">
                  <a onclick="movieSelected('${cases.imdbID}')" class="btn btn-primary btn-rounded" href="#"><i class="fa fa-info-circle"></i> ${upperFirst(cases.Type)} Details</a>
                </div>
            </div>
          </div></article>
          `;
  return myHTML;
}

// Check for tvdbID This is used to match with tvshows from sonarr.

function getTvdb(id) {
  var tvdbid = '';
  this.data.forEach(function(type) {
    [type].forEach(function(entry) {
      $.each(entry, function(i, item) {
        $.each(item, function(x, y) {
          if (y.imdbId === id && y.tvdbId !== null &&
            y.tvdbId !== '') {
            tvdbid = y.tvdbId;
          }
        });
      });
    });
  });
  return tvdbid;
}

// Sets session Storage items, MovieID, tvdb ID, if its in collection or not
// grabs the last search result, and redirects on back button.
function movieSelected(id) {
  var tvdbID = getTvdb(id);
  if (tvdbID !== '') {
    sessionStorage.setItem('tvdbID', tvdbID);
  }
  sessionStorage.setItem('movieId', id);
  if (document.getElementById(id + 'inCollection')) {
    sessionStorage.setItem('inCollection', true);
  } else {
    sessionStorage.setItem('inCollection', false);
  }
  var searchedFor = $('#searchText').val();
  window.location = 'info.html?q=' + searchedFor;
  return false;
}