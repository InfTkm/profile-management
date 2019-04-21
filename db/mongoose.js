const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://admin:admin@profile-management-u4vme.mongodb.net/test?retryWrites=true"
// connect to our database
mongoose.connect(mongoURI, { useNewUrlParser: true});

module.exports = { mongoose }