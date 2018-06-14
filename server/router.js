const passport = require('passport');
const passportService = require('./services/passport');
const authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({"hi": "there"})
	})
	// just for testing requireAuth middleware
	//  to test. use postman to call signup. copy the token returned from this request
	// make another get request to '/' and paste the token in request header authentication property
	app.post('/signin', requireSignin, authentication.signIn);
	app.post('/signup', authentication.signUp);
}
