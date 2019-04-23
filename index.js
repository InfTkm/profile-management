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
const { Customer } = require('./db/models/customer.js');

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
			res.status(404).send()
		} else {
			// Add the user to the session cookie that we will
			// send to the client
			if (cd.email == 'admin') {
				req.session.user_id = 'secretadmin'
				res.redirect('/admin')
				return
			}
			req.session.user_id = cd._id
			res.redirect('/input')
			
		}
	}).catch((error) => {
		log(error)
		res.status(404).send()
	})
})
app.get('/input', sessionChecker, (req, res) => {
	res.sendFile(__dirname + '/view/input.html')
})

app.get('/stats', sessionChecker, (req, res) => {
	res.send("功能尚未实现请返回 <a href='/input'>返回</a>")
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

// Customer
app.post('/customer/:name/:phone/:sex/:comment/:age/:vip', (req, res) => {
	const name = req.params.name
	const phone = req.params.phone
	const sex = req.params.sex
	const comment = req.params.comment
	const age = req.params.age
	const vip = req.params.vip
	Customer.insertMany([{name:name, contact:phone, sex:sex, comment:comment, age:age, vip: vip}])
	res.status(200).send()
})

app.get('/find', sessionChecker, (req, res) => {
	Customer.find().then(c => {
		res.render('view/customer.hbs', {c:c})
	})
	
})

app.get('/customers/byContact/:contact', sessionChecker, (req, res) => {
	Customer.find({contact:req.params.contact}).then(c => {
		res.render('view/customer.hbs', {c:c})
	})
})

app.get('/customers/byVIP/:vip', sessionChecker, (req, res) => {
	Customer.find({vip:req.params.vip}).then(c => {
		res.render('view/customer.hbs', {c:c})
	}).catch(err => log(err))
})

app.get('/customers/byName/:name', sessionChecker, (req, res) => {
	Customer.find({name:req.params.name}).then(c => {
		res.render('view/customer.hbs', {c:c})
	})
})

app.get('/customer/update/:vip', sessionChecker, (req, res) => {
	Customer.findOne({vip:req.params.vip}).then(c => {
		const isMale = c.sex=='男'
		res.render('view/update.hbs', {c:c, isMale:isMale})
	})
})

app.patch('/customer/update', (req, res) => {
	const name = req.body.name
	const phone = req.body.phone
	const sex = req.body.sex
	const comment = req.body.comment
	const age = req.body.age
	const vip = req.body.vip
	log(22)
	Customer.findOne({vip:vip}).then(c => {
		log(c)
		c.name = name
		c.phone = phone
		c.sex = sex
		c.comment = comment
		c.age = age
		c.save()
		res.status(200).send()
	}).catch(err => log(err))
	res.status(200).send()
})

// remember to delete
app.get('/DROPALL', (req, res) => {
	Customer.deleteMany({}).then()
	res.status(200).send()
})
app.listen(port);