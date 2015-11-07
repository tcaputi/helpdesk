var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var db = req.db;
  var collection = db.get('helpdesk');
  collection.find({}, {}, function(err, docs){
    res.render('tickets', { 'tickets' : docs });
  });
});

/* GET New User page. */
router.get('/newticket', function(req, res) {
  res.render('newticket', { title: 'Add New Ticket' });
});

/* POST to Add User Service */
router.post('/newticket', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Set our collection
  var collection = db.get('helpdesk');

  // Submit to the DB
  collection.insert({
    "name" : req.body.name,
    "location" : req.body.location,
    "issue" : req.body.issue,
    "time" : (new Date()).toTimeString(),
    "status" : "open"
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }else {
      // And forward to success page
      res.redirect("/");
    }
  });
});

module.exports = router;
