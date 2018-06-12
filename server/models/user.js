/**
 * This is the user model that will be used to store user email and password.
 * - to make user's email unique. add lowercase: true, unique: true
 * - don't save passwords as plain text. instead we use bcrypt npm package to generate salt and use that to hash the password 
 *   and store the hashed password. we define a pre('save', cb) method to hash the password before save() method is called. 
 * - to compare passwords (in case of user sending email and password to login). don't decrypt the password.
 *   instead we use the previously generated salt to hash candidate-password and compare it with the stored hash password.
 *   to achieve this process we add a custom method to userSchema.methods prototype.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// 1. define our user model (email - password)
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String
});

// on save hook, encrypt password
// bcrypt will be used in 2 different stages. 1 on saving a password. 2. comparing passwords to valiadte user password
// before saving a model. run this function
userSchema.pre('save', function(next) {
	const user = this; // access to user model user.email or user.password

	// generate a salt, then run a call back 
	bcrypt.genSalt(10, function(err, salt) {
		if(err) { return next(err); }

		// hash (encrypt) the password using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) { return next(err); }

			// overwrite plain text password with encrypted password
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) { return callback(err); }

		callback(null, isMatch);
	});
};


//  2. create the model class
const ModelClass = mongoose.model('user', userSchema); // load the user into mongoose schema

// 3. Export the model
module.exports = ModelClass;
