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

function getMovie() {
  var movieId = sessionStorage.getItem('movieId');
  getData('https://www.omdbapi.com/?i=' + movieId + '&plot=full', function (err, data) {
    if (err !== null) {
      console.log(err);
    } else {
      var movie = data;
      var apiurl = '';
      if (movie.Type === 'series') {
        var tvdbID = sessionStorage.getItem('tvdbID');
        if (tvdbID !== null) {
          apiurl = 'https://webservice.fanart.tv/v3/tv/' + tvdbID;
        }
      } else {
        apiurl = 'https://webservice.fanart.tv/v3/movies/' + movieId;
      }
      getData(apiurl + '?api_key=' + FANARTAPI, function (err, image) {
        if (err !== null) {
          document.body.style.backgroundColor = '#2b3e50';
          console.log('Something went wrong: ' + err);
        } else {
          var imageUrl = '';
          if (movie.Type === 'series') {
            imageUrl = image.showbackground[0].url;
          } else {
            imageUrl = image.moviebackground[0].url;
          }
          $('body').css('background-image', 'url(' + imageUrl + ')');
        }
      });
      $('#movie').html(htmlWriteInfo(movie));
    }
  });
}

// Writes the info
function htmlWriteInfo(movie) {
  var disabledbutton = '';
  var inCollection = sessionStorage.getItem('inCollection');
  var myHTML = '';
  myHTML += `<div class="row">
            <div class="col-xs-4" id="poster">
              <img src="${posterError(movie.Poster)}" class="img-thumbnail img-rounded" id="movieposter">
            </div>
              <div class="col-xs-8">
              <h2 class="text-center" id="movietitle">${movie.Title}</h2>
                <ul class="list-group">
                  <li class="list-group-item"><strong><i class="fa fa-file"></i> Genre:</strong> ${movie.Genre}</li>
                  <li class="list-group-item"><strong><i class="fa fa-calendar"></i> Released:</strong> ${movie.Released}</li>
                  <li class="list-group-item"><strong><i class="fa fa-clock-o"></i> Runtime:</strong> ${movie.Runtime}</li>
                  <li class="list-group-item"><strong><i class="fa fa-star"></i> Rated:</strong> ${movie.Rated}</li>
                  <li class="list-group-item"><strong><i class="fa fa-imdb"></i> IMDB Rating:</strong> ${movie.imdbRating}</li>
                  <li class="list-group-item"><strong><i class="fa id-badge"></i> IMDB ID:</strong> ${movie.imdbID}</li>
                  <li class="list-group-item"><strong><i class="fa fa-video-camera"></i> Director:</strong> ${movie.Director}</li>
                  <li class="list-group-item"><strong><i class="fa fa-pencil"></i> Writer:</strong> ${movie.Writer}</li>
                  <li class="list-group-item"><strong><i class="fa fa-users"></i> Actors:</strong> ${movie.Actors}</li>
                  <li class="list-group-item"><strong><i class="fa fa-globe"></i> Language:</strong> ${movie.Language}</li>`;
  if (movie.Type === 'series') {
    myHTML += `<li class="list-group-item"><strong><i class="fa fa-television"></i> Total Seasons:</strong> ${movie.totalSeasons}</li>`;
  }
  myHTML += `</ul>
            </div>
        </div>
        <div class="row" id="rowplot">
          <div class="well" id="plot">
            <h3>Plot</h3>
            <p>${movie.Plot}</p>
            <hr>
            <a href="//www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-space btn-warning" data-toggle="tooltip" title="See details on IMDB Website"><i class="fa fa-globe"></i> View IMDB</a>`;
  if (inCollection === 'true') {
    disabledbutton = `danger disabled" disabled`;
  } else {
    disabledbutton = `success"`;
  }
  if (movie.Type !== 'series') {
    myHTML += ` <button class="btn btn-rounded btn-space btn-` + disabledbutton + ` data-toggle="tooltip" title="Just click me once to add to collection" onclick="demoModal()"><i class="fa fa-cloud-download"></i> Add ${movie.Title} to collection</button>`;
  } else {
    myHTML += ` <button class="btn btn-rounded btn-space btn-danger disabled" disabled data-toggle="tooltip" title="Unavailable currently" onclick="demoModal()"><i class="fa fa-cloud-download"></i> Add ${movie.Title} to collection</button>`;
  }
  var searchFor = window.location.href.split('?q=');
  var searchQuery = searchFor[1];
  myHTML += ` <a href="index.html?q=` + searchQuery + `" class="btn btn-default btn-space btn-rounded" data-toggle="tooltip" title="Go back and search for another movie"><i class="fa fa-undo"></i> Go Back</a></div> </div><div class="col-xs-12" style="height:100px;"></div>`;
  return myHTML;
}

function demoModal() {
  bootbox.alert('You just added the movie to Radarr Collection<br> Though this is just a demo...');
}