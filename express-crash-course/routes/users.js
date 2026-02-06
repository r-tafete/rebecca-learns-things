/**
 * When we have multiple routes, we can separarte them into different files
 * For instance, these are for users
 * When creating a route file, import express first
 * then create a router variable by calling express.Router() to give us access to routing functions
 * (router works the same way as app in server.js in this regard)
 */
const express = require("express");
const router = express.Router();


// router.get("/users", (req, res) => {
//     res.send("User list");
// })

// router.get("users/new", (req, res) => {
//     res.send("new user form");
// } )

/** we can nest routes into a parent route based on their URL
 * For instance, both of these routes start with /users, so we can just remove /users from both URLs
 * later, in our server.js file, we will prefix these routes with /users
*/

router.get("/", (req, res) => {
    console.log(req.query.name); // this lets us get the query string from the url in the request
    // e.g., if we have /users/name="Troy", this will now console log "Troy"
    res.send("User list");
});

router.get("/new", (req, res) => {
    // this renders the views/users/new.ejs file and fills out the value for firstName with 'Test'
    res.render("users/new", { firstName: 'Test' });
});

router.post("/", (req, res) => {
    // here, we can take the body of the request form
    const isValid = false;
    if (isValid) {
        users.push( { name: req.body.firstName } );
        res.redirect(`/users/${users.length - 1}`);
    } else {
        console.log("Error creating user");
        res.render("users/new", { firstName: req.body.firstName } );
    }
    console.log(req.body.firstName);
    // res.send("Hi!"); -- leaving this in causes an error
    // this is because express can only send one response per request
    // so you can either re-render the login or send hi

});

/**
 * in express, everything goes from top to bottom
 * note how the route below dynamically takes in the id param
 * if, say, /new was below this route, then express would read this as getting a user with the id "new"
 */
router.get("/:id", (req, res) => {
    console.log(req.id);
    res.send(`Get user with id ${req.params.id}`);
})

router.put("/:id", (req, res) => {
    res.send(`Update user with id ${req.params.id}`);
})

router.delete("/:id", (req, res) => {
    res.send(`Delete user with id ${req.params.id}`);
})

/**
 * Note how all this code is very similar to each other. express allows for function chaining using router.
 * so all the above routes could also be written as:
 * 
   router.route("/:id")
    .get((req, res) => {
        res.send(`Get user with id ${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`Update user with id ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Delete user with id ${req.params.id}`);
    });
 */

/** the router.param function takes in two params-- some desired url parameter and a function
 * whenever a route has that url parameter, the passed-in function executes first
 * router.param is basically a type of middleware-- code that runs between receiving a rq and sending a rs
 */

const users = [{ name: "alice" }, { name: "bob" }, { name: "charlie" }];
router.param("id", (req, res, next, id) => {
    req.id = users[id];
    // next() must be called to continue to the actual route (or some other middleware)-- the "next" thing in line
    next();
})

// middleware can also be into specific routes
function userMiddleware(req, res, next) {
    console.log(req.originalUrl);
    next();
}

// make sure to export your router
module.exports = router;
