var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');


var db = mongoose.connection;

//read data from database
var Schema = mongoose.Schema;
//user Schema
var userSchema = new Schema({
        "id" : String,
        "password" : String,
        "nickname" : String,
        "point" : Number,
        "sex" : String,
        "age" : Number,
        "grade" : String,
        "review_count" : Number
},{collection:'user'});
//restaurant schema
var restaurantSchema = new Schema({
        "id" : String,
        "name" : String,
        "address" : String,
        "phone" : Number,
        "category" : String,
        "latitude" : Number,
        "longitude" : Number,
        "score" : Number,
        "time" : String,
        "menu" : []
},{collection:'restaurant'});
//review schema
var reviewSchema = new Schema({
        "restaurant_id" : Number,
        "restaurant_name" : String,
        "user_id" : String,
        "user_comment" : String,
        "user_score" : Number,
        "image" : []
},{collection:'review'});

var User = mongoose.model('user', userSchema);
var Restaurant = mongoose.model('restaurant', restaurantSchema);
var Review = mongoose.model('review', reviewSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  latitude = req.query.latitude;
  longitude = req.query.longitude;
  //find data with latitude and longitude
  Restaurant.find({'latitude' : latitude, 'longitude' : longitude}, function(err,data){
    if(err){
      res.json(err.errors);
    }
    else{
      res.json(data);
    }
  });
});

router.post('/', function(req,res, next){
  restaurant_id = req.body.restaurant_id;
  restaurant_name = req.body.restaurant_name;
  user_id = req.body.user_id;
  user_comment = req.body.user_comment;
  user_score = req.body.user_score;
  image = req.body.image;
  //review data format, json
  data = {
    "restaurant_id" : restaurant_id,
    "restaurant_name" : restaurant_name,
    "user_id" : user_id,
    "user_comment" : user_comment,
    "user_score" : user_score,
    "image" : image
  }
  //insert review data to db
  Review.collection.insertOne(data, function(err, res){
    if(err){
      res.json(err.errors);
    }
  });
  res.json('inserted');
});

module.exports = router;
