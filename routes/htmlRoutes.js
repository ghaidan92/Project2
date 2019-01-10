var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function(app) {
  // Load signup page
  app.get("/", function(req, res) {
    return res.render("index");
  });
  
  app.get("/questions", function(req, res) {
    return res.render("questions");
  });

  app.get("/profile", function(req, res) {
    return res.render("profile");
  });
   
  // Load login page
  // app.get("/", function(req, res) {
  //   res.render("index");
  // });

  // Load profile page
  app.get("/profile", isAuthenticated, function(req, res) {
    db.User.findOne({
      where: {
        id: req.user.id
      },
      // include: [db.User]
    }).then(function(dbUser) {
      res.render("profile", { user: dbUser });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", isAuthenticated, function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};