const log = console.log;
const assert = require('assert');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs')
const session = require('express-session')


const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static('view'));
app.set('view engine', 'hbs')
app.set('views', __dirname)

const { mongoose } = require('./db/mongoose')
const { ObjectID } = require('mongodb').ObjectID;

// Import mongoose models
const { Credential } = require('./db/models/credential.js');

/* SESSION COOKIES*/
app.use(session({
	secret: 'oursecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 60000 * 60,
		httpOnly: true
	}
}))

// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
	if (!req.session.user_id) {
		res.sendFile(__dirname + '/view/login.html')
	} else {
		next();
	}
}

// route redirection//////////////////////////////////////////////////////////
// route for root; redirect to login
app.get('/', sessionChecker, (req, res) => {
	res.sendFile(__dirname + '/view/index.html')
})

app.route('/login')
	.get(sessionChecker, (req, res) => {
		res.sendFile(__dirname + '/view/login.html')
	})



// User login and logout routes
app.post('/users/login', (req, res) => {
	const email = req.body.email
	const password = req.body.password

	Credential.findByEmailPassword(email, password).then((cd) => {

		if(!cd) {
			log(1)
			res.status(404).send()
		} else {
			log(cd)
			// Add the user to the session cookie that we will
			// send to the client
			if (cd.email == 'admin') {
				req.session.user_id = 'secretadmin'
				res.redirect('/admin')
			}
			User.findOne({email: email}).then(user =>{
				req.session.user_id = user._id
				res.redirect('/input')
			}).catch(err => res.status(404).send())
			
		}
	}).catch((error) => {
		log(error)
		res.status(404).send()
	})
})
app.get('/input', sessionChecker, (req, res) => {
	res.sendFile(__dirname + '/view/search_group.html')
})

app.get('/admin', (req, res) => {
	if (req.session.user_id == 'secretadmin') {
		res.sendFile(__dirname + '/view/admin.html')
	} else {
		res.redirect('login')
	}
	
})

app.get('/users/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})

app.listen(port);