require ('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

let refreshTokens = [];

/** this function gets the refresh token to our auth server
*/

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    // check if token exists. would normally store in redis or cache but here we'll just store locally
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    });
});

/** we also need a way to deauthenticate refresh tokens to prevent eternal access 
 * normally youd be deleting from a database or cache. here we're just removing from the array
*/
app.delete("/logout", (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
})

/**
 * You would generally have two servers; one for auth and refresh, and one for all other functions
 * this is the auth/refresh server
 */
app.post('/login', (req, res) => {

    /**
     * authetnicate user first
     * create json web token (jwt)
     * create jwt variable and require jsonwebtoken
     * also recognize that since we are passing around json objects, we need to use express.json() as well
     */
    const username = req.body.username;
    const user = { name: username }

    /**
     * serialize the user using the jwt and the secret key (stored in .env)
     * Now, whenever we log in, assuming that our user is authenticated right, we will create an access token for them
     * That access token will have the user information saved inside it
     * make sure to require ("dotenv").config so the env file can be accessed
     * set the expiration for the initial access token, then provide a refresh token that doesnt expire. make sure to include both in the json
     */

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

app.listen(4000);