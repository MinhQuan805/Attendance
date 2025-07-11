const express = require("express");
const app = express();
var methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var flash = require('express-flash');
var path = require('path');
require('dotenv').config()
const port = process.env.PORT || 3000;

const routeAdmin = require("./routes/admin/index.route.js");
const route = require("./routes/client/index.route.js");

const systemConfig = require("./config/system.js");

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));
// Method Override
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// End method-override

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Flash
app.use(cookieParser('MyCommerce'));
app.use(session({ 
    secret: 'MyCommerce',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));
app.use(flash());
// End Flash

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// End TinyMCE


//Routes
route(app);
routeAdmin(app);
// End Routes

//Connect
const connect = require("./config/database");
connect();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});