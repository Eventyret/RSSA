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
- TheMovieDB
- The Open Movie Database
- FanartTV
- TheTVDB

The program does a search for data with OmDB for what you are searching for, then matches this with the information from Radarr and Sonarr, and tells you if it is in your collection. 
It matches this by using sizeonDisk and IMDB titles. Using the API from Radarr and Sonarr to post to your collection.

## Features
 
### Existing Features
- Search for any Movie or TV Series
- Add to movie collection
- Grabs a random fanart at the first page. (if it exists)
- Grabs the fanart for the movie you are looking in detail (if it exists)
- Places a placeholder image if there is no poster to display
- Disable button to add to collection if it is already in your collection

### In Progress

- Add to series collection (This is for now disabled) (It needs an API call to TheTVDB)
- Add  POST API for TheTVDB to connect to their endpoint /login
- Store the token and pass this to their API to get tvdbID to be used in `info.js`
 
### Features Left to Implement
- Enable AJAX to go back to search (Right now it just takes you back to the main page)
- Cleanup URL's and make them global variable for easy usage of others.
 
## Tech Used
### Some the tech used includes:
- [Bootstrap](http://getbootstrap.com/)
    - We use **Bootstrap** to give our project a simple, responsive layout
- [Bootswatch Flatly](https://bootswatch.com)
    - We use just a simple theme from Bootswatch named **[Flatly](https://bootswatch.com/flatly/)**

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
    - Providing a API to serach for movies and TV Shows
- [TheMovieDB](https://developers.themoviedb.org/3)
    - Providing a API to find for movies and TV Shows

## Contributing
 
### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone https://github.com/Eventyret/FrontEndProject.git``` command
2. Create an empty file called `api.js` in `js/`
3. Place this code in and fill in the variables with your API codes
```javascript 
var apifan = 'YOURAPIKEY' // Calling FanartApi
var apiv = 'YOURAPIKEY' // Calling RadarrApi
var apis = 'YOURAPIKEY' // Calling SonarrApi
var tmdbapi = 'YOURAPIKEY' // Calling TheMovieDbApi
var tvdb = 'YOURAPIKEY' //Calling TheTVdbApi
```
4.In main.js replace your url

- You can find the API codes for **Radarr** and **Sonarr** in their ``/settings/general`` section.
    - API codes for **FanArt.tv** **TheMovieDB** you will need an account for. (Free)
        - [Fanart.tv](https://fanart.tv/get-an-api-key/)
        - [TheMovieDB](https://www.themoviedb.org/settings/api)
        - [TheTVDB](http://thetvdb.com/)
3. All Done. Thats it you can now just go to your URL and its ready to be used

- You can select the time it takes to load the page in `/js/common.js`

   -Line 54 (Change the miliseconds) `setTimeout(function () {$(".loader").hide();}, 6000);`
   Bigger Libary needs longer time (Not found a workaround for this yet.)


## Technologies used

![Technologies](https://camo.githubusercontent.com/904ade21b6fb63dec17555495bb36f749ba52023/68747470733a2f2f73332d75732d776573742d322e616d617a6f6e6177732e636f6d2f706c7567696e7365727665722f646f635265736f75726365732f737461636b2e737667)