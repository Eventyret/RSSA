let data = []

// Checks for poster
function posterError (poster) {
  if (poster === 'N/A') {
    return 'img/poster-dark.png'
  } else {
    return poster
  }
}

// Loading Animation
$(document).ready(function () {
  $('.loader').show()
})

setTimeout(function () {
  $('.loader').hide()
}, 6000)

// Tooltip function
$(document).ready(function () {
  $('body').tooltip({ selector: '[data-toggle=tooltip]' })
})
