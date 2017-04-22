# Radarr & Sonarr Search Application (RSSA)
 
## Overview
 
### What is this app for?
 
Ever wanted to use [Radarr](https://github.com/Radarr/Radarr) or [Sonarr](https://github.com/Sonarr/Sonarr) from just a search function? Well look no further

### What does it do?
 RSSA uses the API from [Radarr](https://github.com/Radarr/Radarr) and [Sonarr](https://github.com/Sonarr/Sonarr) (if installed) to find what is in your libary. It will then match what you are searching for, and display in a simple term if you have it in your collection or not.
    

### How does it work
 
RSSA will compare the result you are searching for with what you already have in your collection.
It will load the Radarr & Sonarr JSON into one array and when you search it will loop through and check for matches. 
It is considered to be in your collection if *sizeonDisk is greater then 0* and *IMDB title matches*.

This app uses the API's from the following ressources
- Radarr
- Sonarr
- The Open Movie Database
- FanartTV

## Features
 
### Existing Features
- Search for any Movie or TV Show.
- Add a movie or TV Show to your collection.
- Grabs a random fanart at the first page. (if it exists)
- Grabs the fanart for the movie you are looking in detail. (if it exists)
- Adds a placeholder image if there is no poster to display.
- "Add to collection" button is disabled if you have it in your collection.
- Validates input - You have to type something to search for something.
- Displays a **__Green banner__** on top of the movie if it is **__IN your collection.__**
- Displays a **__Red banner__** over the movie if its **__NOT in your collection.__**

![Incollection](http://i.imgur.com/REPeTxI.png)![notIncollection](http://i.imgur.com/HM4ptxW.png)

### In Progress
 
### Features Left to Implement
 
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
    - Sonarr is a PVR for Usenet and BitTorrent users.
- [FanArt.tv](https://www.fanart.tv)
    - Providing the API for Backdrops / Backgrounds.
- [The Open Movie Database](https://www.omdbapi.com/)
    - Providing a API to search for movies and TV Shows

## Contributing

### Requirements
- [Radarr](https://github.com/Radarr/Radarr) (This needs to be present and installed)
- [Sonarr](https://github.com/Sonarr/Sonarr) (*This is **optional** and will match for tv shows if installed*)
 
### Setup
1. Firstly you will need to clone this repository by running the ```git clone https://github.com/Eventyret/FrontEndProject.git``` command
2. Replace the **RADARRURL** and **SONARRURL** with your own radarurl and apikey. 

```javascript 
var FANARTAPI = '' // FanArt.tv API KEY
var RADARRURL = 'http://localhost:7878/api/systen/status=apikey=${YOUR_API_KEY}' // Radarr URL
var SONARRURL = 'http://localhost:8989/api/system/status?apikey=${YOUR_API_KEY}' // Sonarr URL 
```

Information regarding their API endpoints can be found below.
- [Radarr Github Wiki](https://github.com/Radarr/Radarr/wiki/API)
- [Sonarr Github Wiki](https://github.com/Sonarr/Sonarr/wiki/API)
- API codes for **FanArt.tv** you will need an account for and its free.
    - [Fanart.tv](https://fanart.tv/get-an-api-key/)
3. Add your newly created **Fanart.tv** API key to the `js\api.js`
4. All Done. Thats it you can now just go to your URL and its ready to be used

# Do you want to test it and see how it is? [Demo here](https://eventyret.github.io/FrontEndProject)

## Technologies used

![Technologies](https://camo.githubusercontent.com/904ade21b6fb63dec17555495bb36f749ba52023/68747470733a2f2f73332d75732d776573742d322e616d617a6f6e6177732e636f6d2f706c7567696e7365727665722f646f635265736f75726365732f737461636b2e737667)