var mongoose = require('mongoose');
var User  = mongoose.model('user');

//GET - Return all users in the DB
exports.findAllUsers = function(req, res) {
	User.find(function(err, users) {
    if(err) res.send(500, err.message);

    console.log('GET /users')
		res.status(200).jsonp(users);
	});
};

//GET - Return a User with specified ID
exports.findById = function(req, res) {
	User.findById(req.params.id, function(err, user) {
    if(err) return res.send(500, err.message);

    console.log('GET /user/' + req.params.id);
		res.status(200).jsonp(user);
	});
};

//POST - Insert a new User in the DB
exports.addUser = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var user = new User({
        cc :    req.body.cc,
		name:	req.body.name,
		email: 	req.body.email,
		phone: 	req.body.phone,
		address: 	req.body.address,
		birth:  req.body.birth,
	});

	user.save(function(err, user) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(user);
	});
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		user.cc   = req.body.cc;
		//user.name    = req.body.name;
		//user.phone = req.body.phone;
		//user.email  = req.body.email;
		//user.address = req.body.address;
	//	user.birth   = req.body.birth;
		user.balance  = req.body.balance;
		user.discount = req.body.discount;
		user.birth = req.body.birth;
		
		user.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(user);
		});
	});
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		user.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};