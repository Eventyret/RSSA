# Radarr & Sonarr Search Application (RSSA)
 
## Overview
 
### What is this app for?
 
Ever wanted to use [Radarr](https://github.com/Radarr/Radarr) or [Sonarr](https://github.com/Sonarr/Sonarr) from one dashboard or just from a search? Well look no further

### What does it do?
 
You can just make a search and see if the movie or TV show is in your collection, you can also add it to your collection if you want that.
 
### How does it work
 
This app uses the API's from the following ressources
- Radarr
- Sonarr
- The Open Movie Database
- FanartTV

RSSA will compare the result you are searching for with what you already have in your collection.
It matches this by using *sizeonDisk* and *IMDB titles*. It will use Radarr and Sonarr's API to post to your collection.

## Features
 
### Existing Features
- Search for any Movie or TV Series
- Add to a movie to your Radarr collection
- Grabs a random fanart at the first page. (if it exists)
- Grabs the fanart for the movie you are looking in detail. (if it exists)
- Adds a placeholder image if there is no poster to display.
- Button is disabled if you have it in your collection.

### In Progress
 
### Features Left to Implement
- Add to series collection (**This is currently not working due the API from TheTVDB**)
 
## Tech Used
### Some the tech used includes:
- [Bootstrap](http://getbootstrap.com/)
    - We use **Bootstrap** to give our project a simple, responsive layout
- [Bootswatch](https://bootswatch.com)
    - We use just a simple theme from Bootswatch named **[Flatly](https://bootswatch.com/flatly/)**
- [Bootbox.js](http://bootboxjs.com/)
    - This is for the alert boxes made into modal.

## Thanks to

- [Bradtraversy](https://github.com/bradtraversy/movieinfo) 
    - The Original page design and where i got the idea. Check out his [Youtube](https://www.youtube.com/watch?v=YsPqjYGauns) This is using the framework he built here, and extended with other functionality.

- [Radarr](https://github.com/Radarr/Radarr)
    - Fork of Sonarr, but for movies
- [Sonarr](https://github.com/Sonarr/Sonarr)
    - Mostly used for NZB but was adapted to use Torrent! Amazing project
- [FanArt.tv](https://www.fanart.tv)
    - Providing the API for Backdrops
- [The Open Movie Database](https://www.omdbapi.com/)
    - Providing a API to search for movies and TV Shows

## Contributing

### Dependencies
- [Radarr](https://github.com/Radarr/Radarr) (This needs to be present and installed)
- [Sonarr](https://github.com/Sonarr/Sonarr) (*This is **optional** and will match for series if installed*)
 
### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone https://github.com/Eventyret/FrontEndProject.git``` command
2. Reaplce variables with your API codes and respective urls
```javascript 
var FANARTAPI = '' // FanArt.tv API KEY
var RADARRURL = './demodata/movies.json' // Your Radarr URL
var SONARRURL = './demodata/series.json' // Your Sonarr URL 
var STATUSURL = './demodata/status.json' // Your Radarr URL /api/status
```

- You can find the API codes for **Radarr** and **Sonarr** in their ``/settings/general`` section.
 For assistance on their URL and examples using their API:
    - [Radarr Github Wiki](https://github.com/Radarr/Radarr/wiki/API) 
    - [Sonarr Github Wiki](https://github.com/Sonarr/Sonarr/wiki/API)
- API codes for **FanArt.tv** you will need an account for and its free.
    - [Fanart.tv](https://fanart.tv/get-an-api-key/)
3. All Done. Thats it you can now just go to your URL and its ready to be used

- You can select the time it takes to load the page in `/js/common.js`
   - Line 54 (Change the miliseconds) `setTimeout(function () {$(".loader").hide();}, 6000);`
   - Bigger Libary needs longer time (Not found a workaround for this yet.)

Do you want to test it and see how it is?
## [Demo here](https://eventyret.github.io/FrontEndProject)

## Technologies used

![Technologies](https://camo.githubusercontent.com/904ade21b6fb63dec17555495bb36f749ba52023/68747470733a2f2f73332d75732d776573742d322e616d617a6f6e6177732e636f6d2f706c7567696e7365727665722f646f635265736f75726365732f737461636b2e737667)