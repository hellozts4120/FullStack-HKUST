var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    var id = mongoose.Types.ObjectId(req.decoded._doc._id);
    Favorites.find({}, function (err, id) {
        .populate('customer');        
        .populate('favlist');
        .exec(function(err, favs) {
            if (err) throw err;
            res.json(favs)
        });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    var id = req.decoded._doc._id;
    console.log(id);
    Favorites.update(
        {customer: id},
        {$setOnInsert: {customer: id}},
        {upsert: true},
        function(err, res) {
            console.log('upsert result:');
            console.log(res);
        }
    );
    
    Favorites.findOne(
        {customer: id},
        function(err, favs) {           
            if (err) throw err;
            var dishId = req.body._id;
            console.log("adding dish with dishId = " + dishId);
            if (favs.favlist == undefined) {
                favs.favlist = [dishId];
            }
            else {
                if (favs.favlist.indexOf(dishId) == -1) {
                    favs.favlist.push(dishId);
                }
                else {
                    console.log("dish already in favlist");
                }
            }
            console.log("favs:");
            console.log(favs);
            favs.save(function(err, favs) {
                if (err) throw err;
                console.log('Updated favs');
                res.json(favs);
            });
        }
    );
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    var id = req.decoded._doc._id;
    Favorites.findOne(
        {customer: id},
        function(err, favs) {
            if (err) throw err;
            if (favs.favlist != undefined) {
                favs.favlist = [];
            }
            favs.save(function(err, favs) {
                if (err) throw err;
                console.log('Favorites deleted!');
                res.json(favs);
            });
        }
    );
})

favRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    var id = req.decoded._doc._id;
    Favorites.findOne(
        {customer: id},
        function(err, favs) {
            if (err) throw err;
            var dishId = req.params.dishId;
            console.log("deleting dish with dishId = " + dishId);
            if (favs.favlist != undefined) {
                var index = favs.favlist.indexOf(dishId);
                if (index != -1) {
                    favs.favlist.splice(index);
                }
                else {
                    console.log("dishId not found!");
                }
            }
            favs.save(function(err, favs) {
                if (err) throw err;
                console.log('Favorite deleted!');
                res.json(favs);
            });
        }
    );
})

module.exports = favoriteRouter; 