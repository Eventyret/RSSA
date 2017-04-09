var getData = function (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.onload = function () {
    var status = xhr.status
    if (status === 200) {
      callback(null, xhr.response)
    } else {
      callback(status)
    }
  }
  xhr.send()
}



// Function to pass between search and info 
function getMovie() {
  let movieId = sessionStorage.getItem('movieId')
  axios.get('https://www.omdbapi.com/?i=' + movieId)
    .then((response) => {
      let movie = response.data;
      var apiurl = ''
      if (movie.Type == 'series') {
        var tvdbID = sessionStorage.getItem('tvdbID')
        if (tvdbID != null) {
          apiurl = 'https://webservice.fanart.tv/v3/tv/' + tvdbID
        }
      } else {
        apiurl = 'https://webservice.fanart.tv/v3/movies/' + movieId
      }
      getData(apiurl + '?api_key=' + apifan, function (err, image) {
        if (err != null) {
          document.body.style.backgroundColor = '#2b3e50'
          console.log('Something went wrong: ' + err)
        } else {
          var imageUrl = ''
          if (movie.Type == 'series') {
            imageUrl = image.showbackground[0].url
          } else {
            imageUrl = image.moviebackground[0].url
          }
          $('body').css('background-image', 'url(' + imageUrl + ')');
          console.log(imageUrl)
        }
      })
      $('#movie').html(htmlWriteInfo(movie))
    })
    .catch((error) => {
      console.log(error)
    })
};
// Writes the info
function htmlWriteInfo(movie) {
  let inCollection = sessionStorage.getItem('inCollection')
  let myHTML = ''
  myHTML += `<div class="row">
            <div class="col-md-4" id="poster">
              <img src="${posterError(movie.Poster)}" class="img-thumbnail img-rounded" id="movieposter">
            </div>
              <div class="col-md-8">
              <h2 class="text-center">${movie.Title}</h2>
                <ul class="list-group">
                  <li class="list-group-item"><strong><i class="fa fa-file"></i> Genre:</strong> ${movie.Genre}</li>
                  <li class="list-group-item"><strong><i class="fa fa-calendar"></i> Released:</strong> ${movie.Released}</li>
                  <li class="list-group-item"><strong><i class="fa fa-clock-o"></i> Runtime:</strong> ${movie.Runtime}</li>
                  <li class="list-group-item"><strong><i class="fa fa-star"></i> Rated:</strong> ${movie.Rated}</li>
                  <li class="list-group-item"><strong><i class="fa fa-imdb"></i> IMDB Rating:</strong> ${movie.imdbRating}</li>
                  <li class="list-group-item"><strong><i class="fa fa-video-camera"></i> Director:</strong> ${movie.Director}</li>
                  <li class="list-group-item"><strong><i class="fa fa-pencil"></i> Writer:</strong> ${movie.Writer}</li>
                  <li class="list-group-item"><strong><i class="fa fa-users"></i> Actors:</strong> ${movie.Actors}</li>
                  <li class="list-group-item"><strong><i class="fa fa-flag"></i> Country:</strong> ${movie.Country}</li>`
  if (movie.Type === 'series') {
    myHTML += `<li class="list-group-item"><strong><i class="fa fa-television"></i> Total Seasons:</strong> ${movie.totalSeasons}</li>`
  }
  myHTML += `</ul>
            </div>
        </div>
        <div class="row" id="rowplot">
          <div class="well" id="plot">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="//imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-warning" data-toggle="tooltip" title="See details on IMDB Website"><i class="fa fa-globe"></i> View IMDB</a>`
  if (movie.Type !== 'series' && inCollection == false) {
    myHTML += ` <button class="btn btn-success btn-rounded" data-toggle="tooltip" title="Just click me once to add to collection" onclick="addToCollection(objtype)"><i class="fa fa-cloud-download"></i> Add to collection</button>`
  }
  else {
    myHTML += ` <button class="btn btn-danger btn-rounded disabled" data-toggle="tooltip" title="Sorry can't add Series yet" onclick="#"><i class="fa fa-cloud-download"></i> Add to collection</button>`
  }
  myHTML += ` <a href="index.html" class="btn btn-primary btn-rounded" data-toggle="tooltip" title="Go back and search for another movie"><i class="fa fa-undo"></i> Go Back</a></div> </div><div class="col-xs-12" style="height:100px;"></div>`;
  return myHTML
}
$(function () {
  
  getData('https://eventyret.uk/movies/api/system/status/?apikey=' + apiv, function (err, data) {
    if (err != null) {
      console.log('Something went wrong: ' + err)
    } else {
      var myDate = new Date(data.buildTime)
      $('#version').html(`<i class="fa fa-info-circle"></i> Version` + ' ' + data.version + ' ' + 'Build Time: ' + myDate.getDate() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getFullYear())
    }
  })
});

function addToCollection(objtype) {
  let movieId = sessionStorage.getItem('movieId')
  getData('https://api.themoviedb.org/3/find/' + movieId + '?external_source=imdb_id&language=en-US&api_key=' + tmdbapi, function (err, data) {
    if (err !== null) {
      console.log('Something went wrong: ' + err)
    } else {
      var title = data.movie_results[0].title 
      var profileId = 6
      var year = data.movie_results[0].release_date.substring(0, 4)
      var  id = data.movie_results[0].id
      var  titleSlug = title.replace(/\s+/g, '-')
      titleSlug = titleSlug + '-' + id
      titleSlug = titleSlug.toLowerCase();
      var rootFolderPath = '/media/Movies/Movies/'
      var poster = 'https://image.tmdb.org/t/p/original' + data.movie_results[0].poster_path
      var backdrop = 'https://image.tmdb.org/t/p/original' + data.movie_results[0].backdrop_path
      var ajaxUrl = 'https://eventyret.uk/movies/api/movie/?apikey=' + apiv
      var obj = '{ "title": "' + title + '", "qualityProfileId": ' + profileId + ', "titleSlug": "' + titleSlug + '", "images": [{ "coverType": "poster",'+
      '"url": "' + poster + '"},{"coverType": "banner","url": "' + backdrop + '"}], "tmdbId": ' + id + ', "rootFolderPath": "' + rootFolderPath + '", "year": "' + year + '", "minimumAvailability": "announced" }';
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        contentType: "application/json",
        data: obj,
        success: function(data) { alert("Added to collection"); },
        error: function(xhr, textStatus, ex) {
        if (xhr.status==201) { this.success(null, "Created", xhr); return; }
        $("#ajaxreply").text( textStatus + "," + ex + "," + xhr.responseText );
    },
        dataType: 'application/json'
      });
  }
  }
  )
};


