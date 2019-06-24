
// Get references to page elements
var $submitBtn2 = $("#neutral");
var $mood = $("#mood");
var $submitBtn = $("#treadmill");
var $submitBtn3 = $("#happy");



// The API object contains methods for each kind of request we'll make
var API = {
    saveExample: function(example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "/api/mood",
        data: JSON.stringify(example)
      });
    },
    getExamples: function() {
      return $.ajax({
        url: "api/examples",
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
  var handleFormSubmit = function(event) {
    event.preventDefault();
  
    var example = {
      description: $submitBtn.val()
    };
  
    API.saveExample(example).then(function() {
      refreshExamples();
    });
  
    $submitBtn.val("");
  };