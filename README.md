# Radarr & Sonarr Search Application (RSSA)
 
## Overview
 
### What is this app for?
 
Ever wanted to use [Radarr](https://github.com/Radarr/Radarr) or [Sonarr](https://github.com/Sonarr/Sonarr) from just a search function? Well, look no further.

### What does it do?
 RSSA uses the API from [Radarr](https://github.com/Radarr/Radarr) and [Sonarr](https://github.com/Sonarr/Sonarr) to find what is in your libary. It will then match what you are searching for and display in a simple term if you have it in your collection or not.   

### How does it work?
 
RSSA will compare the result you are searching for with what you already have in your collection.
It will load the Radarr & Sonarr JSON into one array and when you search it will loop through and check for matches. 
It is considered to be a part of your collection if *Size on disk is greater than 0* and matches the *IMDB ID or title*.

This app uses the API's from the following resources:
- Radarr
- Sonarr
- The Open Movie Database
- FanartTV

## Features

- Search for any movie or TV series.
- Add a movie or TV series to your collection.
- Grabs a random background at the first page. (If it exists)
- Grabs the background for the movie you are looking in detail. (If it exists)
- Adds a placeholder image if there is no poster to display.
- "Add to Collection" button is disabled if you have it in your collection.
- Dynamic loading - It will remove the loading animation once the array is ready.
- Validates input - Use the search bar to find a movie or TV series. (***This cannot be blank***)
- Custom 404 Error page with random quotes from `js\404.js`
- Displays a **__green banner__** on top of the result if it is **__IN your collection.__**
- Displays a **__red banner__** on top of the result if its **__NOT in your collection.__**

![Collection Preview](http://i.imgur.com/bHIfftd.png)


## Want to do it yourself?

### Requirements
- [Radarr](https://github.com/Radarr/Radarr) (This is **required** to match for movies)
- [Sonarr](https://github.com/Sonarr/Sonarr) (This is **optional** and will match for tv series if installed)
 
### Setup
1. First, you will need to clone this repository by running the ```git clone https://github.com/Eventyret/FrontEndProject.git``` command
2. Replace the **FANARTAPI** with your own api key, replace the **RADARRURL** and **SONARRURL** with your own urls and apikeys in `js\api.js`. 

```javascript 
var FANARTAPI = 'YOUR_API_KEY' // FanArt.tv API KEY
var RADARRURL = 'http://localhost:7878/api/systen/status=apikey=${YOUR_API_KEY}' // Radarr URL
var SONARRURL = 'http://localhost:8989/api/system/status?apikey=${YOUR_API_KEY}' // Sonarr URL 
```

Information regarding the API endpoints can be found in their respective wiki pages below:
- [Radarr Wiki](https://github.com/Radarr/Radarr/wiki/API)
- [Sonarr Wiki](https://github.com/Sonarr/Sonarr/wiki/API)
- **Fanart.tv** is used for the backgrounds and you will need to create an free account for the API key. It can be found [here](https://fanart.tv/get-an-api-key/).
3. All configurations are done, you can run `index.html` on any server.

# Want to test it and see how it works? [Demo here](https://eventyret.github.io/FrontEndProject)

---

## Testing
 There have been a few things to test during this process. Here are a few examples:
  - Loading Time / Loading Animation 
    - This was at first just static with [`setTimeout`](https://www.w3schools.com/js/js_timing.asp) set to a specific time, the bigger the array the longer the timeout. This was changed after testing and a new function named `hideLoaderIfReady` was created. This function will check if both the movie and series array is loaded and, if function is `true`, it will remove the loading animation. This would speed up the loading time drastically and also create a dynamic loading time, depending on connections. 
        > An example of this: `setTimeout` was set to `6000` (**6 seconds**). After using `hideLoaderIfReady`, the time was reduced down to **1.5 seconds**. By decreasing the loading time, the experience for the user will be improved with less time spent waiting for the page to load.

  - The Search Form 
    - If the user did not enter a `string` in the search field, nothing would not be display and the user's experience would be disrupted. As the user would not know if they submitted something or if the function found anything at all, this was changed after testing and I added a required attribute to the form. This would force the user to enter a `string`: If no string is added, the user will then be informed and required to fill in the necessary field. If an user search for anything that do not exsist, this would not be displayed. This was changed so that the user is presented with a  message explaining that the subject was not found.
  - The Help Modal 
    - Before testing, the `onload event` was used to display a modal. The problem now was that this would ruin the user's experience, because every time someone visited the `index.html` it would load up the modal again. After testing, this was changed to use a cookie to check if the modal was closed or not. If a user clicked the Close button, it would save the modal to LocalStorage and check for it on future searches.  This would create a better experience for the user, since the modal would only be displayed to new users or if users clicked the help button.


## Technologies used

<img src="https://camo.githubusercontent.com/904ade21b6fb63dec17555495bb36f749ba52023/68747470733a2f2f73332d75732d776573742d322e616d617a6f6e6177732e636f6d2f706c7567696e7365727665722f646f635265736f75726365732f737461636b2e737667" width="350px">

### Some of the tech we used in this project includes:
- [Bootstrap](http://getbootstrap.com/)
    - We use **Bootstrap** to give our project a simple, responsive layout.
- [Bootswatch](https://bootswatch.com)
    - We use just a simple theme from Bootswatch, named **[Flatly](https://bootswatch.com/flatly/)**.
- [Bootbox.js](http://bootboxjs.com/)
    - This is for the alert boxes made into modal.
- [jQuery](http://jquery.com/)
    - **Included with Bootstrap** to have dynamic elements, e.g modals.

## Credits

- [Bradtraversy](https://github.com/bradtraversy/movieinfo) 
    - The original page design concept and where I got the idea, using his basic tech (**Bootswatch**). A minor part of his original code still exists e.g `movieSelected`. I have then further expanded upon  the code with more / other functionalities and options. e.g matching with **Sonarr** & **Radarr**, **random background**, **static background on info.html**. 
- [Sonarr](https://github.com/Sonarr/Sonarr)
    - Sonarr is a PVR for Usenet and BitTorrent users for tv series.
- [Radarr](https://github.com/Radarr/Radarr)
    - Fork of Sonarr, but for movies.
- [Fanart.tv](https://www.fanart.tv)
    - Providing the API for backgrounds.
- [The Open Movie Database](https://www.omdbapi.com/)
    - Providing a API to search for movies and TV series this also contains the *IMDB ID and 
    titles* used in searches.
     
