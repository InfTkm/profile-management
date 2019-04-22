/* user.js User model */

const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', {
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String
    },
    age: {
        type: String
    },
    contact: {
        type: String
    },
    comment: {
        type: String
    }
})

module.exports = { Customer }