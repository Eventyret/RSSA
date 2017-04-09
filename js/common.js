let data = []

// Checks for poster
function posterError(poster) {
  if (poster == "N/A") {
    return 'img/poster-dark.png'
  }
  else {
    return poster
  }
}
// Menu

$(document).ready(function () {
  var trigger = $('.hamburger'),
    overlay = $('.overlay'),
    isClosed = false

  trigger.click(function () {
    hamburgerCross()
  })

  function hamburgerCross() {
    if (isClosed === true) {
      overlay.hide()
      trigger.removeClass('is-open')
      trigger.addClass('is-closed')
      isClosed = false
    } else {
      overlay.show()
      trigger.removeClass('is-closed')
      trigger.addClass('is-open')
      isClosed = true
    }
  }

  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled')
  })
  
})

// Loading Animation
$(document).ready(function () {
  $(".loader").show();
});

setTimeout(function () {
  $(".loader").hide();
}, 6000);

$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});