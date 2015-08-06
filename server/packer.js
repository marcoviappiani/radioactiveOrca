module.exports = function(movies, callback) {
  var index = 0;
  var results = [];
  //Recursive function to handle multiple async movie lookups
  var movieLookupHelper = function() {
    if (index > movies.length - 1) {
      //All movies have been packed. Call callback.
      callback(results);
    } else {
      var movie = movies[index];
      //check the database to see if we already have information for that movie
      checkForMovie(movie, function(found) {
      //if successfully found,
        if (found) {
        //pack that information in with the movies list and continue to next movie
          packInfo(found, index);
          index++;
          movieLookupHelper();
        } else {
        //hit IMDB for the required information
          getInforFromIMDB(movie, function (data) {
            if (data) {
              //Add this data to the database
              addMovieToDB(data);
              //Pack that information in with the movies list and continue to next movie
              packInfo(data, index);
              index++;
              movieLookupHelper();
            } else {
              //No data back from imdb
              //TODO: HANDLE ERROR HERE???
              index++;
              movieLookupHelper();
            }
          });
        }
      });
    }
  }
  
  
  
  var packInfo = function(movieData, index) {
    var movie = movies[index];
    movie.poster = movieData.poster;
    movie.synopsis = movieData.synopsis;
    results.push(movie);
  }
  var checkForMovie = function(movie, callback) {
    //STUB:
    callback({ title: "Wayne's World", poster: "http://exampleposter.com/image.jpg", synopsis: "This is the movie synopsis"});
    //TODO:
    //Interact with the database here
    //Call callback on movie data if it exists, or null if it doesn't
  }
  var getInfoFromIMDB = function(movie, callback) {
    //TODO: 
    // IMDB API call here
    //call callback on movie data 
  }
  var addMovieToDB = function(moviedata) {
    //TODO:
    //Handle add to database;
  }
  
  movieLookupHelper();
  
}
     