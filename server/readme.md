Authentication server example;

Backend tech stack:
- Node
- mongodb
- mongoos
- bcrypt
- JWT 
- passport.js

Development highlevel overview:
1. intstall dependencies [node, mongodb, mongoose, bcrypt, JWT, passport, etc..]
2. Create User database model to store email and password
	- make sure email is unique
3. Add Rout handler for signUp and signIn 
3. Use bcrypt npm package to store a hashed password instead of a plain text password. 
	- on save hook. hash the password.
	- use pre('save', cb) to hash the password before save() method is called
4. Use JWT npm package to generate tokens for successfully signed-up users and send it back in the response object.
	- use user.id and a timestamp to generate tokens
5. Use passport npm package to create 2 strategies:
	A. JWT Strategy
		- Use-case: signing up --> verify email is not in use --> send back a token 
	B. Local Strategy
		- Use-case: verify Email/Password --> send back a token
		- Use-case: verify token --> protected Resources Access
	- Use bcrypt to compare candidate-password with the stored password - DON'T DECODE THE PASSWORD TO COMPARE. instead hash candidate-password and compare hashed passwords.
6. Use the created strategies as a middleware in router.js to protect resources/routes
