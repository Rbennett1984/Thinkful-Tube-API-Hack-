const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

const RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<a class="js-image-link" href=""><img class="js-image" src=""></a>' +
  '</div>'
);

// retrieves data from API with user keyword
function getDataFromApi(searchTerm, callback) {
// set key value for ajax request from API
  const QUERY = {
    part: 'snippet',
    key: 'AAIzaSyBA9pN1XPD67wx2rEzNV6ymHIp7dJTwg4A',
    q: searchTerm,
  }; 

  .getJSON(YOUTUBE_SEARCH_URL, QUERY, callback);
}

// find and set video thumbnails and links
function renderResult(result) {
  let template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-image").attr("src", result.snippet.thumbnails.medium.url);
  template.find(".js-image-link").attr("href", 
  'https://www.youtube.com/watch?v=' + result.id.videoId);
  return template;
}

// display results of user input
function displayYouTubeSearchData(data) {
  let results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $(".js-search-results").html(results);
}

// on submit run search and clear input field
function watchSubmit() {
  $(".js-search-form").submit(function(event) {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find(".js-query");
    let QUERY = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(QUERY, displayYouTubeSearchData);
    $("span").text("There are " + RESULT_HTML_TEMPLATE.length + " results.")
  });
}

$(watchSubmit);