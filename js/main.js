var getData = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };
  xhr.onerror = function () {
    var status = xhr.status;
    if (status in [400, 404, 405]) {
      console.log('Request Failed with status ' + status);
    }
  };
  xhr.send();
};
var MovieListLoaded = false;
var SeriersListLoaded = false;

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    var searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });

  var moviesandtvshows = [];

  getData(RADARRURL, function (err, data) {
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
      var random = Math.floor(Math.random() * (max - min + 1)) + min;
      var randomID = data[random].imdbId;
      getData('https://webservice.fanart.tv/v3/movies/' + randomID + '?api_key=' + FANARTAPI, function (err, image) {

        if (err !== null || !image.moviebackground) {
          document.body.style.backgroundColor = '#3E4551';
        } else {
          max = image.moviebackground.length;
          random = Math.floor(Math.random() * (max - min + 1)) + min;
          if (random >= max) {
            random = max - 1;
          }
          var randomIDurl = image.moviebackground[random].url;
          $('body').css('background-image', 'url(' + randomIDurl + ')');
          $('body').addClass('randombg');
          sessionStorage.setItem('backgroundImageUrl', randomIDurl);
        }
      });
    }
  });

  getData(SONARRURL, function (err, data) {
    if (err !== null) {
      SeriersListLoaded = true;
      console.log('Something went wrong: ' + err);
    } else {
      moviesandtvshows.push({
        'series': data
      });
      SeriersListLoaded = true;
      searchIt();
    }
  });

  this.data = moviesandtvshows;
});

function searchIt() {
  if (MovieListLoaded && SeriersListLoaded) {
    var searchFor = window.location.href.split('?q=');
    var searchQuery = searchFor[1];

    if (searchQuery !== null && searchFor.length > 1) {
      document.getElementById('searchText').value = decodeURI(searchQuery);
      getMovies(searchQuery);
    }
  }
}

// Loops checks if movie is in collection
function filterMovies(id) {
  var isDownloaded = false;
  this.data.forEach(function (type) {
    [type].forEach(function (entry) {
      $.each(entry, function (i, item) {
        $.each(item, function (x, y) {
          if (y.imdbId === id && y.sizeOnDisk > 0) {
            isDownloaded = true;
          }
        });
      });
    });
  });
  return isDownloaded;
}

// Search Function
function getMovies(searchText) {
  getData('https://www.omdbapi.com/?s=' + searchText, function (err, response) {
    if (err !== null) {} else {
      var omdbData = response.Search;
      var output = '';
      $.each(omdbData, (index, movie) => {
        output += htmlWriteResults(movie);
      });

      $('#movies').html(output);
    }
  });
}

// Writes the Search Results
function htmlWriteResults(cases) {
  var myHTML = '';
  myHTML += `<div class="col-md-4">
            <div class="well text-center">`;
  if (filterMovies(cases.imdbID)) {
    myHTML += `<div class="alert alert-success" id="${cases.imdbID}inCollection"><p><i class="fa fa-cloud-download"></i> In Collection</p></div>`;
  } else {
    myHTML += `<div class="alert alert-danger" id="${cases.imdbID}notInCollection"><p><i class="fa fa-exclamation-triangle"></i> Not in Collection</p></div>`;
  }
  myHTML += `<img src="${posterError(cases.Poster)}">
              <h5 id="whiteheader">${cases.Title} (${cases.Year.substring(0, 4)})</h5>
                <div class="btn-group">
                  <a onclick="movieSelected('${cases.imdbID}')" class="btn btn-primary btn-rounded" href="#"><i class="fa fa-info-circle"></i> ${upperFirst(cases.Type)} Details</a>
                </div>
            </div>
          </div>
          `;
  return myHTML;
}

// Check for tvdbID

function getTvdb(id) {
  var tvdbid = '';
  this.data.forEach(function (type) {
    [type].forEach(function (entry) {
      $.each(entry, function (i, item) {
        $.each(item, function (x, y) {
          if (y.imdbId === id && y.tvdbId !== null && y.tvdbId !== '') {
            tvdbid = y.tvdbId;
          }
        });
      });
    });
  });
  return tvdbid;
}

// Set storage Items
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

// Modal for info
$(document).ready(function () {
  $('#demoModal').modal('show');
});