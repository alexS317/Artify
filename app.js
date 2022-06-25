const express = require('express'); // Import express framework
const app = express();              // Initialize server
const port = process.env.port || process.env.PORT || 3000;

// Import fileupload module to make uploading files easier
const fileUpload = require('express-fileupload');
app.use(fileUpload({createParentPath: true}));

// Import cors module to make requests on other domains
const cors = require('cors');
app.use(cors());

// Import body-parser module to handle post requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Import cookie-parser module (parses cookies attached to the client req object)
const cookieParser = require('cookie-parser');
app.use(cookieParser());


const path = require('path');       // Import path module to work with directory and file paths
const ejs = require('ejs');         // Import module Embedded Javascript Templates (EJS)

app.set('views', path.join(__dirname, 'views'));    // Tell the server that all views are inside views folder
app.set('view engine', 'ejs');                      // Set name 'view engine' and value 'ejs'


// Import files from router directory
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Tell the app to use the created routes
app.use('/', indexRouter);
app.use('/users', usersRouter);


// Make public folder accessible to clients to serve static files
app.use('/public', express.static('public'));


// Start server, app listens to incoming requests
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});