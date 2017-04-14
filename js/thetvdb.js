
var data = {'apikey': tvdbapikey, 'userkey': tvdbuserkey, 'username': tvdbusername}

var xhr = new XMLHttpRequest()
xhr.withCredentials = true

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === 4) {
    console.log(this.responseText)
  }
})

xhr.open('POST', 'https://api.thetvdb.com/login')
xhr.setRequestHeader('content-type', 'application/json')

xhr.send(data)
