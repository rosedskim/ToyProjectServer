var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');


var db = mongoose.connection;

//read data from database
var Schema = mongoose.Schema;

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

var User = mongoose.model('user', userSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('get connect');

  res.render('index', { title: 'Express' });
});

router.post('/', function(req,res, next){

        user_id = req.body.id;
	console.log(user_id);
        User.find({'id': user_id}, function(err,data){
                console.log(data);
		res.json(data);
        });
});

module.exports = router;

