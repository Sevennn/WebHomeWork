var express = require('express');
var router = express.Router();
var query = require('querystring');
/* GET home page. */

module.exports = function(db) {
  var userMan = require("../modules/users")(db);

  router.get('/regist', function(req, res, next) {
    if (req.session.user)
      res.redirect('/detail')
    else
      res.render('register');
  });

  router.post('/regist', function(req, res, next) {
    var user = req.body;
    userMan.CreateUser(user,function(){
      req.session.user = req.body;
      res.json({});
    });
  });
// Check repeat
  router.post('/checkid', function(req, res, next) {
    userMan.CheckId(req.body.id, function(data) {
      res.send(data);
    });
  });

  router.post('/checkname', function(req, res, next) {
    userMan.CheckName(req.body.name, function(data) {
      res.send(data);
    });
  });

  router.post('/checkphone', function(req, res, next) {
    userMan.CheckPhone(req.body.phone, function(data) {
      res.send(data);
    });
  });

  router.post('/checkemail', function(req, res, next) {
    userMan.CheckEmail(req.body.email, function(data) {
      res.send(data);
    });
  });
  router.get('/signin', function(req, res, next) {
    if (req.session.user)
      res.redirect('/detail')
    else
      res.render('signin');
  });
  router.post('/signin', function(req, res, next) {
    var user = {
      "username" : req.body.username,
      "password" : req.body.password
    };
    userMan.Login(user, function(data, u) {
      if (data["success"] != undefined) {
        req.session.user = u;
      }
      res.json(data);
    });
  });


  router.get('/logout', function(req, res, next) {
    delete req.session.user;
    res.redirect('signin');
  });


  router.all('*', function(req, res, next){
    console.log('why i am here ');
    req.session.user ? next() : res.redirect('/signin');
  });

  router.get('/', function(req, res, next) {
    var user = req.query;
    if (user.username != req.session.user.username && user.username != undefined)
      res.render('usersinfo', {users: req.session.user, error:"只能访问自己的页面(⊙o⊙)哦"});
    else
      res.render('usersinfo', {users: req.session.user});
  });
  

  router.get('/detail', function(req, res, next) {
    res.render('usersinfo', {users: req.session.user});
  });

  return router;
}
