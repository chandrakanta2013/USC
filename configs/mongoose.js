config = require('./configs');
mongoose = require('mongoose');
module.exports = function() {
    var db = mongoose.connect(config.db, config.mongoDBOptions).then(
        () => {
            console.log('MongoDB connected')
        },
        (err) => {
            console.log('MongoDB connection error',err)
        }
        );
    require('../app/models/admin.server.model');
    require('../app/models/customers.server.model');
    require('../app/models/authorization.server.model');
    require('../app/models/subusers.server.model');
    
    return db;
};
