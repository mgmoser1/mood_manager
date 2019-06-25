var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/mymood", function(req, res) {
    db.Post.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/exercise", function(req, res) {
    db.Post.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/mood", function(req, res) {
    db.Post.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Create a new user
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(user) {
      res.json(user);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
