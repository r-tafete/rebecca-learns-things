require ('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: "reebs",
        title: "Post 1"
    },
    {
        username: "bees",
        title: "Post 2"
    }
]

// pass in authenticateToken so it runs and validates the user before fetching the posts

app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
})

function authenticateToken(req, res, next) {
    /**
     * get the token from the header
     * the token is in the format "Bearer *TOKEN*" (you know this from work) 
     * ensure that you have a header first before splitting it
     **/

    const authHeader = req.headers['authorization'];
    const token = authHeader &&authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    /** now time to verify the token wth the token and the secret */
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        // beyond this, you know the token is valid
        req.user = user;
        next();
    });
}

app.listen(3000);