# Radarr & Sonarr Search Application (RSSA)
 
## Overview
 
### What is this app for?
 
Ever wanted to use [Radarr](https://github.com/Radarr/Radarr) or [Sonarr](https://github.com/Sonarr/Sonarr) from just a search function? Well, look no further.

### What does it do?
 RSSA uses the API from [Radarr](https://github.com/Radarr/Radarr) and [Sonarr](https://github.com/Sonarr/Sonarr) (if installed) to find what is in your libary. It will then match what you are searching for and display in a simple term if you have it in your collection or not.   

### How does it work?
 
RSSA will compare the result you are searching for with what you already have in your collection.
It will load the Radarr & Sonarr JSON into one array and when you search it will loop through and check for matches. 
It is considered to be a part of your collection if *Size on disk is greater than 0* and matches the *IMDB ID or title*.

This app uses the API's from the following ressources
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
- Validates input - Use the search bar to find a movie or TV series. (***This cannot be blank**)
- Displays a **__green banner__** on top of the result if it is **__IN your collection.__**
- Displays a **__red banner__** on top of the result if its **__NOT in your collection.__**

![Incollection](http://i.imgur.com/REPeTxI.png)![notIncollection](http://i.imgur.com/HM4ptxW.png)


## Want to do it yourself?

### Requirements
- [Radarr](https://github.com/Radarr/Radarr) (This is **required** to match for movies)
- [Sonarr](https://github.com/Sonarr/Sonarr) (This is **optional** and will match for tv series if installed)
 
### Setup
1. First, you will need to clone this repository by running the ```git clone https://github.com/Eventyret/FrontEndProject.git``` command
2. Replace the **RADARRURL** and **SONARRURL** with your own radarurl and apikey. 

```javascript 
var FANARTAPI = 'YOUR_API_KEY' // FanArt.tv API KEY
var RADARRURL = 'http://localhost:7878/api/systen/status=apikey=${YOUR_API_KEY}' // Radarr URL
var SONARRURL = 'http://localhost:8989/api/system/status?apikey=${YOUR_API_KEY}' // Sonarr URL 
```

Information regarding the API endpoints can be found in their respective wiki pages below:
- [Radarr Wiki](https://github.com/Radarr/Radarr/wiki/API)
- [Sonarr Wiki](https://github.com/Sonarr/Sonarr/wiki/API)
- **Fanart.tv** is used for the backgrounds and you will need to create an free account for the API key. It can be found [here](https://fanart.tv/get-an-api-key/).
3. Add your newly created **Fanart.tv** API key to the `js\api.js`
4. All configurations are done, you can run `index.html` on any server.

# Want to test it and see how it works? [Demo here](https://eventyret.github.io/FrontEndProject)
--
## Credits

- [Bradtraversy](https://github.com/bradtraversy/movieinfo) 
    - The original page design concept and where I got the idea, using his basic tech (**Bootswatch**). Further expanded upon with more / other functionalities and options.
- [Sonarr](https://github.com/Sonarr/Sonarr)
    - Sonarr is a PVR for Usenet and BitTorrent users for tv series.
- [Radarr](https://github.com/Radarr/Radarr)
    - Fork of Sonarr, but for movies.
- [Fanart.tv](https://www.fanart.tv)
    - Providing the API for backgrounds.
- [The Open Movie Database](https://www.omdbapi.com/)
    - Providing a API to search for movies and TV series.


## Technologies used

<img src="https://camo.githubusercontent.com/904ade21b6fb63dec17555495bb36f749ba52023/68747470733a2f2f73332d75732d776573742d322e616d617a6f6e6177732e636f6d2f706c7567696e7365727665722f646f635265736f75726365732f737461636b2e737667" width="350px">

### Some of the tech we used in this project includes
- [Bootstrap](http://getbootstrap.com/)
    - We use **Bootstrap** to give our project a simple, responsive layout
- [Bootswatch](https://bootswatch.com)
    - We use just a simple theme from Bootswatch named **[Flatly](https://bootswatch.com/flatly/)**
- [Bootbox.js](http://bootboxjs.com/)
    - This is for the alert boxes made into modal.
- [jQuery](http://jquery.com/)
    - **Included with Bootstrap** to have dynamic elements, like modals.