var data = [];

// Checks for poster
function posterError (poster) {
  if (poster === 'N/A') {
    return 'img/poster.png';
  } else {
    return poster;
  }
}
// Create First letter uppercase
function upperFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Loading Animation
$(document).ready(function () {
  $('.loader').show();
});

function hideLoaderIfReady() {
  if (MovieListLoaded && SeriersListLoaded){
    $('.loader').hide();
  }
}

// Tooltip function
$(document).ready(function () {
  $('body').tooltip({ selector: '[data-toggle=tooltip]' });
});