var mongoose = require('mongoose');
var Payment  = mongoose.model('payment');
var User  = mongoose.model('user');
var UserCtrl = require('../controllers/users');

//GET - Return all Payments in the DB
exports.findAllPayments = function(req, res) {
	Payment.find(function(err, payments) {
    if(err) res.send(500, err.message);

    console.log('GET /payments')
		res.status(200).jsonp(payments);
	});
};

//GET - Return a Payment with specified ID
exports.findById = function(req, res) {
	Payment.findById(req.params.id, function(err, payment) {
    if(err) return res.send(500, err.message);

    console.log('GET /payment/' + req.params.id);
		res.status(200).jsonp(payment);
	});
};

//POST - Insert a new Payment in the DB
exports.addPayment = function(req, res) {
	console.log('POST');
	console.log(req.body);
	
	User.findById(req.body.client, function(err, user) {
        if(err) console.log(err);
        user.balance = 0;
        user.save(function(err) {
          if (err)
            console.log(err)
          else
            console.log('success user update')
        });
        console.log('User find', user);
	});

	var payment = new Payment({
        client :    req.body.client,
		amount:	req.body.amount,
		date: 	req.body.date,
		service: 	req.body.service,
		clerk: 	req.body.clerk,
	});

	payment.save(function(err, payment) {
		if(err) return res.send(500, err.message);
        res.status(200).jsonp(payment);
	});
};

//DELETE - Delete a Payment with specified ID
exports.deletePayment = function(req, res) {
	Payment.findById(req.params.id, function(err, payment) {
		payment.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};