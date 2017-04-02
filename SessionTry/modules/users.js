var express = require('express');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(db) {
  var users = db.collection('users');


  return {
    CheckName: function(name, callback) {
      users.find({"username":name}).toArray(function(err, data) {
        if (data.length == 0)
          callback("");
        else
          callback("Have");
      });
    },
    CheckId: function(id, callback) {
      users.find({"id":id}).toArray(function(err, data) {
        if (data.length == 0)
          callback("");
        else
          callback("Have");
      });
    },
    CheckPhone: function(phone, callback) {
      users.find({"phone":phone}).toArray(function(err, data) {
        if (data.length == 0)
          callback("");
        else
          callback("Have");
      });
    },
    CheckEmail: function(email, callback) {
      users.find({"email":email}).toArray(function(err, data) {
        if (data.length == 0)
          callback("");
        else
          callback("Have");
      });
    },
    Login: function(user, callback) {
      return users.find({"username": user.username}).toArray(function(err, data) {
        if (data.length == 0)
          callback({"username":"Not Such a user", "password":""}, null);
        else {
          bcrypt.compare(user.password, data[0].password, function(err, r) {
            if (r) {
              callback({"success":true}, data[0]);
            }
            else
              callback({"username":"", "password":"Wrong password"}, null);
          });
        }
      });
    },
    CreateUser: function(user, callback) {
      bcrypt.hash(user.password, null, null, function(error, hash) {
                user.password = hash;
                users.insert(user);
                callback();
      });
    }
  }
}
