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

// Modal for info
$(document).ready(function () {
  if (!localStorage.getItem('introdismissed')) {
    $('#helpModal').modal('show');
  }
});

function dismissHelp() {
  localStorage.setItem('introdismissed', true);
  $('#helpModal').modal('hide');
}

function showHelp() {
  localStorage.setItem('introdismissed', false);
  $('#helpModal').modal('show');
}