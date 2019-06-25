var db = require("../models");

const Example = 's03a3gg4y7sdw9yb';

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll().then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load mood page
  app.get("/mood", function(req, res) {
    res.render("mood");
  });

  // Load mood page
  app.get("/exercise", function(req, res) {
    res.render("exercise");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Load overview page and pass either week (7 days) or month (30 days) view, default is month view
  app.get("/examples/", function(req, res) {
    db.Example.findAll().then(function(dbExamples) {
      res.render("overview", {
        examples: dbExamples
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
