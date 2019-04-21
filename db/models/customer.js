/* user.js User model */

const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', {
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String
    }
})

module.exports = { Customer }