const express = require('express');
const passport = require('passport');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const helmet = require('helmet');
const fs = require('fs');
const https = require('https');
const hsts = require('hsts');
const nocahe = require('nocache');
require('dotenv').config();

require('./src/config/passport')(passport);

// Database connection
const mongo = require('./src/database/mongo_db');

// var privateKey = fs.readFileSync(__dirname+'/ssl/if_addison_api.key');
// var certificate = fs.readFileSync(__dirname+'/ssl/if-addison-api-cn.crt');
// var options = {
//     key: privateKey,
//     cert: certificate
// };

// route files
const seller_register = require('./src/api/seller/registration');
const seller_login = require('./src/api/seller/login');
const user_register = require('./src/api/user/registration');
const user_login = require('./src/api/user/login');
const add_product = require('./src/api/seller/add_product');
const fetch_product = require('./src/api/seller/fetch_product');
const update_product = require('./src/api/seller/update_product');
const delete_product = require('./src/api/seller/delete_product');
const fetch_product_user = require('./src/api/user/fetch_product');
const add_to_cart = require('./src/api/user/add_to_cart');
const cart_data = require('./src/api/user/cart_data');
const update_pwd = require('./src/api/seller/update_pwd');
const reset_pwd = require('./src/api/seller/reset_pwd');
const purchase = require('./src/api/user/purchase');
const welcome = require('./src/api/user/welcome');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(helmet.hidePoweredBy()); // Disable x-powered-by
app.use(hsts({ maxAge: 86400 })); // enforces secure (HTTP over SSL/TLS) connections to the server
app.use(nocahe()); // To disable client-side caching

// swagger file
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// middleware routes
app.use('/api/seller', seller_register);
app.use('/api/seller', seller_login);
app.use('/api/seller', add_product);
app.use('/api/seller', fetch_product);
app.use('/api/seller', update_product);
app.use('/api/seller', delete_product);
app.use('/api/seller', update_pwd);
app.use('/api/user', user_register);
app.use('/api/user', fetch_product_user);
app.use('/api/user', user_login);
app.use('/api/user', add_to_cart);
app.use('/api/user', cart_data);
app.use('/api/user', purchase);
app.use('/api/seller', reset_pwd);
app.use('/', welcome);


const Port = process.env.PORT || 3000;
//var server = https.createServer(options, app);

app.listen(Port, () => { // start server
    console.log(`server running on port ${Port}`);
});

// connect to Database
try {
    mongo.connect();
} catch (err) {
    console.log('error while connecting database');
}

