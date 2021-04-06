var db = require('../db');
var shortid = require('shortid');

var User = require('../models/user.model');
const { Query } = require('mongoose');

module.exports.index = async function(req, res) {
  var users = await User.find();
  res.render('users/index', {
    users:users
  });
};

module.exports.search = async function(req, res) {
  var q = req.query.q;

  var matchedUser = await User.find();
  var matchedUsers = matchedUser.filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    users: matchedUsers
  });
}

module.exports.create = function(req, res) {
  res.render('users/create');
};


module.exports.get = async function(req, res) {
  var id = req.params.id;

  var user = await User.find({ id: id });

  res.render('users/view', {
    user: user
  });
};

module.exports.postCreate = async function(req, res) {
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split('/').slice(1).join('/');
  await User.create(req.body);

  res.redirect('/users');
};








