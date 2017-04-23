var data = [];

// Checks for poster
function posterError(poster) {
  if (poster === 'N/A') {
    return 'img/poster.png';
  } else {
    return poster;
  }
}
// Create First letter uppercase
function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Loading Animation
$(document).ready(function () {
  $('.loader').show();
});

// Checks if array of movies and series are loaded
function hideLoaderIfReady() {
  if (MovieListLoaded && SeriesListLoaded) {
    $('.loader').hide();
  }
}

// Tooltip function
$(document).ready(function () {
  $('body').tooltip({
    selector: '[data-toggle=tooltip]'
  });
});

// Loading modal with help first time
$(document).ready(function () {
  if (!localStorage.getItem('introdismissed')) {
    $('#helpModal').modal('show');
  }
});

// Dismisses the help on close button
function dismissHelp() {
  localStorage.setItem('introdismissed', true);
  $('#helpModal').modal('hide');
}

// Shows the help modal again when clicking button
function showHelp() {
  localStorage.setItem('introdismissed', false);
  $('#helpModal').modal('show');
}