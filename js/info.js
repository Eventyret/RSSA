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
getToken(); // testing the call to the API 
// Function to pass between search and info
function getMovie() {
  let movieId = sessionStorage.getItem('movieId')
  axios.get('https://www.omdbapi.com/?i=' + movieId + '&plot=full')
    .then((response) => {
      let movie = response.data;
      var apiurl = ''
      if (movie.Type === 'series') {
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
          if (movie.Type === 'series') {
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
  var disabledbutton = ''
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
                  <li class="list-group-item"><strong><i class="fa id-badge"></i> IMDB ID:</strong> ${movie.imdbID}</li>
                  <li class="list-group-item"><strong><i class="fa fa-video-camera"></i> Director:</strong> ${movie.Director}</li>
                  <li class="list-group-item"><strong><i class="fa fa-pencil"></i> Writer:</strong> ${movie.Writer}</li>
                  <li class="list-group-item"><strong><i class="fa fa-users"></i> Actors:</strong> ${movie.Actors}</li>
                  <li class="list-group-item"><strong><i class="fa fa-globe"></i> Language:</strong> ${movie.Language}</li>`
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
   if (inCollection === 'true') 
    { 
      disabledbutton = `danger disabled" disabled` 
    }
    else { 
     disabledbutton = `success"`  
    }
  if (movie.Type !== 'series') {
    myHTML += ` <button class="btn btn-rounded btn-` + disabledbutton + ` data-toggle="tooltip" title="Just click me once to add to collection" onclick="addToMovieCollection()"><i class="fa fa-cloud-download"></i> Add ${movie.Title} to collection</button>`
  } else {
    myHTML += ` <button class="btn btn-rounded btn-danger disabled" disabled data-toggle="tooltip" title="Unavailable currently" onclick="addToSeriesCollection()"><i class="fa fa-cloud-download"></i> Add ${movie.Title} to collection</button>`
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

function addToMovieCollection() {
  let movieId = sessionStorage.getItem('movieId')
  getData('https://api.themoviedb.org/3/find/' + movieId + '?external_source=imdb_id&language=en-US&api_key=' + tmdbapi, function (err, data) {
    if (err !== null) {
      console.log('Something went wrong: ' + err)
    } else {
      var title = data.movie_results[0].title
      var profileId = 6
      var year = data.movie_results[0].release_date.substring(0, 4)
      var id = data.movie_results[0].id
      var titleSlug = title.replace(/\s+/g, '-')
      titleSlug = titleSlug + '-' + id
      titleSlug = titleSlug.toLowerCase();
      var rootFolderPath = '/media/Movies/Movies/'
      var poster = 'https://image.tmdb.org/t/p/original' + data.movie_results[0].poster_path
      var backdrop = 'https://image.tmdb.org/t/p/original' + data.movie_results[0].backdrop_path
      var ajaxUrl = 'https://eventyret.uk/movies/api/movie/?apikey=' + apiv
      var obj = '{ "title": "' + title + '", "qualityProfileId": ' + profileId + ', "titleSlug": "' + titleSlug + '", "images": [{ "coverType": "poster",' +
        '"url": "' + poster + '"},{"coverType": "banner","url": "' + backdrop + '"}], "tmdbId": ' + id + ', "rootFolderPath": "' + rootFolderPath + '", "year": "' + year + '", "minimumAvailability": "announced", "monitored": true }';
      $.ajax({
        type: 'POST',
        url: ajaxUrl,
        contentType: 'application/json',
        data: obj,
        success: function (data) { alert('Added to collection'); },
        error: function (xhr, textStatus, ex) {
          if (xhr.status == 201) { this.success(null, 'Created', xhr); return; }
          $('#ajaxreply').text(textStatus + ',' + ex + ',' + xhr.responseText);
        },
        dataType: 'application/json'
      });
    }
  }
  )
};

function addToSeriesCollection() {
  let movieId = sessionStorage.getItem('movieId')
  getData('https://api.themoviedb.org/3/find/' + movieId + '?external_source=imdb_id&language=en-US&api_key=' + tmdbapi, function (err, data) {
    if (err !== null) {
      console.log('Something went wrong: ' + err)
    } else {
      var title = data.tv_results[0].original_name
      var profileId = 6
      var monitored = true
      // var year = data.movie_results[0].release_date.substring(0, 4)
      var id = data.tv_results[0].id
      var titleSlug = title.replace(/\s+/g, '-')
      titleSlug = titleSlug + '-' + id
      titleSlug = titleSlug.toLowerCase();
      var rootFolderPath = '/media/Movies/Series/'
      var poster = 'https://image.tmdb.org/t/p/original' + data.tv_results[0].poster_path
      var backdrop = 'https://image.tmdb.org/t/p/original' + data.tv_results[0].backdrop_path

      getData('https://api.themoviedb.org/3/tv/' + id + '?api_key=' + tmdbapi, function (err, data2) {
        if (err !== null) {
          console.log('Something wnet wrong: ' + err)
        } else {
          var Seasons = data2.seasons
          var SeasonsLength = data2.seasons.length
          var seasonsText = '"seasons": ['
          //for each
          Seasons.forEach(function(mySeason){
            var i = mySeason.season_number
            seasonsText += '{ "seasonNumber": ' + i + ',"monitored": true'
            if (i == Seasons[SeasonsLength - 1].season_number) {
             seasonsText += '} ],'
            }
            else { seasonsText += '},'
          }
            })
          var ajaxUrl = 'https://eventyret.uk/series/api/series/?apikey=' + apis
          var obj = '{ "title": "' + title + '", "qualityProfileId": ' + profileId + ', "titleSlug": "' + titleSlug + '", "images": [{ "coverType": "poster",' +
            '"url": "' + poster + '"},{"coverType": "banner","url": "' + backdrop + '"}], "tvdbId": ' + id + ', "rootFolderPath": "' + rootFolderPath + '", "minimumAvailability": "announced", "seasonFolder": true, "seriesType": "standard", ' + seasonsText +
            '"addOptions":{"ignoreEpisodesWithoutFiles": true}} ';
          $.ajax({
            type: 'POST',
            url: ajaxUrl,
            contentType: 'application/json',
            data: obj,
            success: function (data) { alert('Added to collection'); },
            error: function (xhr, textStatus, ex) {
              if (xhr.status == 201) { this.success(null, 'Created', xhr); return; }
              $('#ajaxreply').text(textStatus + ',' + ex + ',' + xhr.responseText);
            },
            dataType: 'application/json'
          });
        }
      })
    }
  }
  )
};