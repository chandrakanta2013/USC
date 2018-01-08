var express = require('express');
config = require('./configs');
morgan = require('morgan');
compress = require('compression');
bodyParser = require('body-parser');
methodOverride = require('method-override');
session = require('express-session');
jwt = require('jsonwebtoken');
multer = require('multer'); //middleware for handling multipart/form-data
cors = require('cors'); //For cross domain error
// crypto = require('crypto');
//CryptoJS = require('node-cryptojs-aes').CryptoJS; //For Encryption and Decryption
fs = require('file-system');
multiparty = require('multiparty'); /*For File Upload*/

/*var MongoStore = require('connect-mongo')(express);
NOTE : - This is used to strore session variable's value in database.
But this is not working right now because it shows some error. please check it if want to use it.*/

module.exports = function() {
    //console.log('env' + process.env.NODE_ENV)
    var app = express();
    //console.log(__dirname)
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress({ threshold: 2 }));
    }

    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit:50000
    }));

    app.use(bodyParser.json());

    app.use(methodOverride());

    app.use(cors());
    // app.use(morgan('combined')); // Just uncomment this line to show logs.

    app.use(session({
        cookie: { maxAge: 30000 },
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    return app;
};
