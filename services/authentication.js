const jwt = require('jsonwebtoken');    // Import JSONWebToken module to be able to authenticate user (with the help of cookies)
const AUTH_TOKEN_SECRET = require('../secrets').auth_token_secret;
const bcrypt = require('bcrypt');       // Import bcrypt module to be able to encrypt user passwords


// Compare the password user is entering to log in with password in database
async function checkPassword(password, hash) {
    let pw = await bcrypt.compare(password, hash);
    return pw;
}

// Authenticate user when logging in, check if username and password are correct
async function authenticateUser({username, password}, users, res) {       // {username, password} from req.body
    const user = users.find(u => {                                        // find the first one that fulfills criteria
        return u.username === username;
    });
    // If the credentials are correct, create a cookie and redirect the user to their page
    if (user && await checkPassword(password, user.password)) {
        res.cookie('ID', user.id);      // Cookie to check who logged in
        const accessToken = jwt.sign({id: user.id, username: user.username}, AUTH_TOKEN_SECRET);
        res.cookie('accessToken', accessToken);                     // Set cookie name and value
        res.redirect('/users/' + user.id);
        console.log('User ' + user.username + ' logged in.');
    } else {
        res.redirect('/error');
    }
}

// Check if user is logged in
function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];
    // If the token is correct, let the user access
    if(token) {
        jwt.verify(token, AUTH_TOKEN_SECRET, (err, user) => {
            if(err) {
                console.log('forbidden');
                // return res.sendStatus(403);
                return res.redirect('/error');
            }
            req.user = user;
            next();
        });
    } else {
        console.log('unauthorized');
        // res.sendStatus(401);
        res.redirect('/error');
    }
}

module.exports = {
    authenticateUser,
    authenticateJWT
}