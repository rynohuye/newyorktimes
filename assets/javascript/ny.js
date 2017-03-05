//api key
var authKey = "2bc8126991004954ac4cd2ab2fbbeccb";
// setup variables for parameters
var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

//setup search buttons to append this when button is clicked 
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";
// counter for # of articles
var articleCounter = 0;

//fuctions 
function runQuery(numArticles, queryURL) {
  // use ajax to get data from queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
    //store it in a var = data
  }).done(function(data) {
    // console log the url
    console.log("URL: " + queryURL);
    // log the data to console
    console.log(data);

    // with a for loop, retrieve desired # of articles
    //first clear wells
     $("#well-section").empty();

    for (var i = 0; i < numArticles; i++) {
      // content that will appear in html
      var wellSection = $("<div>");
      wellSection.addClass("well");
      wellSection.attr("id", "article-well-" + i);
      $("#well-section").append(wellSection);
      //for search results add headline
      if (data.response.docs[i].headline !== "null") {
        console.log(data.response.docs[i].headline.main);
        $("#article-well-" + i)
          .append("<h3>" + data.response.docs[i].headline.main + "</h3>");
      }
      // include byline if avail
      if (data.response.docs[i].byline && data.response.docs[i].byline.original) {
        console.log(data.response.docs[i].byline.original);
        $("#article-well-" + i).append("<h5>" + data.response.docs[i].byline.original + "</h5>");
      }
      // add section name, date it was published, and url to the article
      $("#article-well-" + i).append("<h5>" + data.response.docs[i].section_name + "</h5>");
      $("#article-well-" + i).append("<h5>" + data.response.docs[i].pub_date + "</h5>");
      $("#article-well-" + i)
        .append(
          "<a href=" + data.response.docs[i].web_url + ">" +
          data.response.docs[i].web_url + "</a>"
        );
      console.log(data.response.docs[i].section_name);
      console.log(data.response.docs[i].pub_date);
      console.log(data.response.docs[i].web_url);
    }
  });
}

// add func to search button
$("#run-search").on("click", function(event) {

  event.preventDefault();
  // set articleCounter to 0
  articleCounter = 0;
  // clear wells again
  $("#well-section").empty();
  // use user input
  searchTerm = $("#search-term").val().trim();
  var queryURL = queryURLBase + searchTerm;
  // use # selected by user through drop down
  numResults = $("#num-records-select").val();
  // use start year if applicable
  startYear = $("#start-year").val().trim();
  // use end year if applicable
  endYear = $("#end-year").val().trim();
  // if startYear is inputted include it in the queryURL
  if (parseInt(startYear)) {
    queryURL = queryURL + "&begin_date=" + startYear + "0101";
  }
  // if endYear is inputted include it in the queryURL
  if (parseInt(endYear)) {
    queryURL = queryURL + "&end_date=" + endYear + "0101";
  }
  // run final queryURL and the number of results to
  // include to the runQuery function
  runQuery(numResults, queryURL);
});
// clear button func
$("#clear-all").on("click", function() {
  articleCounter = 0;
  $("#well-section").empty();
});