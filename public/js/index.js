$(function(){

// Get references to page elements
var $submitid = $("#submitbtn");
var $mood = $("#mood");
var $activity = $("#activity");
var $submitbtntr = $("#submitbtntr")
var $submitbtnw = $("#submitbtnw")
var $submitbtnb = $("#submitbtnb")
var $submitbtnh = $("#submitbtnh")
var $submitbtnn = $("#submitbtnn")
var $submitbtns = $("#submitbtns")




// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/mood",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/mymood",
      type: "GET"
    });
  },
  createUser: function() {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/user",
      type: "POST"
    }).then(function(res) {
      localStorage.setItem("trackRabbit", res.id);
    });
  }
};

//Check for user information stored in local storage
localStorage = window.localStorage;

if (!localStorage.getItem("trackRabbit")) {
  
  API.createUser();
}

const userID = localStorage.getItem("trackRabbit");

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "api/mymood" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      $li.append($button);

      return $li;
    });

    $mood.empty();
    $mood.append($examples);
  });
};



var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    //mood: $mood.val().trim(),
    activity: $activity.val().trim()
  };
  

  

  API.saveExample(example).then(function() {
    //refreshExamples();
    console.log("It worked")
  });

  $mood.val("");
  $activity.val("");
  console.log(example)
};




$submitid.on("click", handleFormSubmit);
$submitbtntr.on("click", handleFormSubmit);
$submitbtnw.on("click", handleFormSubmit);
$submitbtnb.on("click", handleFormSubmit);
$submitbtnh.on("click", handleFormSubmit);
$submitbtnn.on("click", handleFormSubmit);
$submitbtns.on("click", handleFormSubmit);
});