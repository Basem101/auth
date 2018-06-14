const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function userToken(user) {
	const timeStamp = new Date().getTime();
	// good practice: don't use email to generate tokens because users may change their email later.
	// Instead use user.id to make it easier to search for users using findById.
	return jwt.encode({
		sub: user.id, // subject
		iat: timeStamp // issued at time
	}, config.secret);
}

// signUp controller
exports.signUp = function (req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	if(!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password!'});
	}

	
	// signup business logic for the signup handler
	// 1. check if the email exists in the databse
	User.findOne({ email: email }, function(err, existingUser) { 
		if(err) { return next(err); } // handle serach error 

		// 2. if email exist. return an error
		if(existingUser) {
			return res.status(422).send({ error: 'Email is in use' }); // 422 is unprocessable entity
		}

		// 3. if user does not exist. create a new user
		const user = new User({email, password}); // this line creates a new user object in memory
		user.save(function (err) { // save the new user object to the database
			if(err) { return next(err); } // if there is an error saving the new record

			// 4. respond to the request indicating the user was created successfully 
			// generate a token
			const token = userToken(user);
			return res.json({ token: token });
		});
	});
}

// signIn controller
exports.signIn = function(req, res, next) {
	// user has already had their email and password auth'd
	// we just need to give them a token
	return res.send({ token: userToken(req.user)});
}
