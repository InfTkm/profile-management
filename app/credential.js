const { User } = require('../db/models/user.js')

function x () {
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://99.79.26.111:27017';
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err); 
        const db = client.db('matchy');
        const collection = db.collection('credentials');
        collection.insertOne({admin:'admin'});
        client.close();
    })
}

function findUserIdByEmail(email) {
    User.findOne({email: email}).then(user =>{
        const temp = JSON.stringify(user._id)
        return temp
    }).catch(err => console.log(err))
}

module.exports = { findUserIdByEmail }
