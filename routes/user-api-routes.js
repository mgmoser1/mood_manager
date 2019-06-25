var db = require("../models");

module.exports = function(app) {
  // app.get("/api/users", function(req, res) {
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post
  //   db.User.findAll({
  //     include: [db.Post]
  //  }).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });
  app.get("/api/users/:name", function(req, res) { // MGM - this shows user by name.
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findOne({
      where: {
        name: req.params.name
      },
      include: [db.Post]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) { // MGM - this shows all users along with their associated posts.
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", function(req, res) { // MGM - Deletes all posts by a user when the user is deleted.
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
