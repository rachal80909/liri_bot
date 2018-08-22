// dependencies
require("dotenv").config();

// Import npm packages
var Spotify = require("node-spotify-api");
var request = require("request");
//spotify npm

// Import the API keys
var keys = require("./keys");


// Import the FS package for read/write.
var fs = require("fs");

// Writes to the log.txt file
var getArtistNames = function(artist) {
    return artist.name;
};

// Function for running a Spotify search
var getMeSpotify = function(songName) {
    if (songName === undefined) {
        songName = "What's my age again";
    }

    spotify.search({
            type: "track",
            query: songName
        },
        function(err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};


// Function for running a Movie Search
var getMeMovie = function(movieName) {
    if (movieName === undefined) {
        movieName = "Mr Nobody";
    }

    var urlHit = "http://www.omdbapi.com/?t=81c6bfa1" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    request(urlHit, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);

            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        }
    });
};

// Function for running a command based on text file
var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);

        var dataArr = data.split(",");

        if (dataArr.length === 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            pick(dataArr[0]);
        }
    });
};

// Function for determining which command is executed
var pick = function(caseData, functionData) {
    switch (caseData) {
        case "my-tweets":
            getMyTweets();
            break;
        case "spotify-this-song":
            getMeSpotify(functionData);
            break;
        case "movie-this":
            getMeMovie(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI doesn't know that");
    }
};

// Function  takes in command line arguments and executes correct function accordingly
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv[3]);

// @here if you are still waiting on Twitter to approve your API key but want to proceed with the HW, you can add a new command-line option for LIRI called `my-news`.  This should return 20 headlines from a news API of your choosing.  The information should also include additional details like author, published date, url to full news article depending on what is available from the API.  One good one to try is `https://newsapi.org/docs/get-started`.  They have a top-headlines API that you can use to get headline news information from multiple sources.