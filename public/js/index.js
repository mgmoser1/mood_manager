$(function(){

// Get references to page elements
//var $submitBtn2 = $("#neutral");
var $submitid = $("#submitbtn");
var $mood = $("#mood");
var $activity = $("#activity");
//var $sad = $(".sad");
//var $neutral = $(".neutral");
//var $happy = $(".happy");
//var $treadmill = $(".treadmill");
//var $weights = $(".weights");
//var $bike = $(".bike");



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
  //const userID = Math.floor(Math.random() * 10000);
  //localStorage.setItem("trackRabbit", userID);
  //create new user
  API.createUser();
}

const userID = localStorage.getItem("trackRabbit");

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

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

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
/*var handleFormSubmit = function(event) {
  event.preventDefault();

  var day = {
    mood: $moodid.val(),
    exercise: $exerciseid.val()
  };

  API.saveExample(day).then(function() {
    refreshExamples();
  });
  console.log(day)
  //$submitBtn.val("");
};

var selectSad = function(event) {
  //event.preventDefault();
  //element.setAttribute("id", "mood");
  setAttribute("id", "mood")
};

var selectNeutral = function(event) {
  //event.preventDefault();
  //element.setAttribute("id", "mood");
  $(this).setAttribute("id", "mood")
};

var selectHappy = function(event) {
  //event.preventDefault();
  //element.setAttribute("id", "mood");
  document.getElementsByClassName("happy")[0].setAttribute("id", "mood");
};

var selectexercise = function(event) {
  //event.preventDefault();
  this.setAttribute("id", "exercise");
};*/


// Add event listeners to the submit button
/*$(".sad").click(function() {
  setAttribute("id", "exercise");
});*/
//$(".sad").on("click", function(event){
//  this.setAttribute("id", "mood");;
//});

var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    mood: $mood.val().trim(),
    activity: $activity.val().trim()
  };
  console.log(example)

  

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $mood.val("");
  $activity.val("");
  console.log(example)
};




/*$neutral.on("click", selectNeutral);
$happy.on("click", selectHappy);
$treadmill.on("click", selectexercise);
$weights.on("click", selectexercise);
$bike.on("click", selectexercise);*/
$submitid.on("click", handleFormSubmit);
});