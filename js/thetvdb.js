// make the request to the login endpoint
function getToken() {
    var loginUrl = "https://api.thetvdb.com/login"
    var xhr = new XMLHttpRequest();

    xhr.open('POST', loginUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener('load', function () {
        var responseObject = JSON.parse(this.response);
        console.log(responseObject);
        if (responseObject.token) {
            tokenElement.innerHTML = responseObject.token;
        } else {
            tokenElement.innerHTML = "No token received";
        }
    });
    var sendObject = '{"apikey": "' + tvdbapikey + '", "userkey": "' + tvdbuserkey + '", "username": "' + tvdbusername + '"}';
    // console.log('going to send', sendObject);
    xhr.send(sendObject);
    localStorage.setItem('token', token);
}