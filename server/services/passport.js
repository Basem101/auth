/*
	in this module we will create 2 different passport startegies.
	1. jwt strategy:
		we will use this strategy with the signUp route. where we will need to verify the email is not in use.
		when user signup successfully we will send back a token in response.

	2. local strategy
		we will use this strategy to verify username and password for users. 

	use cases:
		1- signing up --> verify email is not in use --> send back a token (JWT strategy)
		2- signing in --> verify Email/Password --> send back a token (Local Strategy)
		3- Auth Request --> verify token --> protected Resources Access
*/

const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');

// create local strategy
// use email field as a username. by default local strategy will be looking for username field
const localOptions = { usernameField: 'email' }; 
const localLogin = new localStrategy(localOptions, function(email, password, done) {
	// verify email and password. call done with user object. if it is the correct credintials
	// if credintials are not valid. call done with false.

	User.findOne({email: email}, function(err, user) {
		if(err) { return done(err); }
		if(!user) { return done(null, false); }

		// compare passwords - is 'password' equal to user.password
		// we will use the custom comparePassword method that is added to userSchema in User model

		user.comparePassword(password, function(err, isMatch) {
			if(err) { return done(err); }
			if(!isMatch) { return done(null, false); }

			return done(null, user);
		})
	})
});

// setup options for JWT Strategy
const jwtOptions = {
	// jwt-token can sit anywhere in a request. can be contained within the body, within the url or in the headers of the request.
	// so we need to tell the strategy where to look on the request to find the token.

	// 1. we need the token that is stored in the request header property called authorization. 
	// 2. we need the secret key to decode the encoded token
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// create JWT Strategy 
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// payload is the decoded jwt token. that has been generated in the authentication controller
	// in this case the payload will be user.id and timeStamp
	// done is a callback function that we need to call wether ot not we were able to authenticate the user.

	// see if user.id exists in our database. if it does. call 'done' with that user object
	// otherwise call 'done' without a user object
	User.findById(payload.sub, function(err, user) {
		if(err) { return done(err, false); } // is search fail

		if(user) { // if user exist. call done with user object. 
			done(null, user);
		} else { // if not. call done and pass in false as a second param
			done(null, false);
		}
	});
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
