const jwt = require('jsonwebtoken');    // Import JSONWebToken module to be able to authenticate user (with the help of cookies)
const bcrypt = require('bcrypt');       // Import bcrypt module to be able to encrypt user passwords
const AUTH_TOKEN_SECRET = require('../secrets').auth_token_secret;


// Compare the password user is entering to log in with password in database
async function checkPassword(password, hash) {
    let pw = await bcrypt.compare(password, hash);
    return pw;
}

// Authenticate user when logging in, check if username and password are correct
function authenticateUser({username, password}, users, res) {       // {username, password} from req.body
const user = users.find(u => {                                      // find the first one that fulfills criteria
        return u.username === username //&& u.password === password;
    });
    if (user && checkPassword(password, user.password)) {
        const accessToken = jwt.sign({id: user.id, username: user.username}, AUTH_TOKEN_SECRET);
        res.cookie('accessToken', accessToken);                     // Set cookie name and value
        res.redirect('/users/' + user.id);
        console.log('User ' + user.username + ' logged in.');
    } else {
        res.send('Username or password are incorrect.');
    }
}

// Check if user is logged in
function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];
    if(token) {
        jwt.verify(token, AUTH_TOKEN_SECRET, (err, user) => {
            if(err) {
                console.log('forbidden');
                return res.sendStatus(403);
            }
            console.log(user);
            req.user = user;
            next();
        });
    } else {
        console.log('unauthorized');
        res.sendStatus(401);
    }
}

module.exports = {
    authenticateUser,
    authenticateJWT
}