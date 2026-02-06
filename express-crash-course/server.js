/**
 * here, we are importing the express module
 * from here, we create an express application by calling express()
 * we can now use the app varable to do "expressy" things, like create routes and start our server
 */

const express = require('express');
const app = express();

// if in ejs, use app.set("view engine", "ejs") to render ejs file
app.set("view engine", "ejs");
// otherwise, to render static files (like html), use express.static:
app.use(express.static("public"));
// now, we can show static files from the public folder. it will default to index.html, but you can pass in different file names as a url param and those files will pop up instead in the browser.

app.use(express.urlencoded( { extended: true } ) ); // to parse form data in req.body

// lets you process json data. does the same as urlencoded but works with parsing JSON data from the body
app.use(express.json());


// since logger is at the top of the code, and express runs from top down, all following routes use this middleware.
// if we don't want to use this middleware everywhere, set it on individual endpoints by passing it into the routes (see individualLogger)
app.use(logger);


/**
 * The "bread and butter" of express is creating routes to take in requests to servers and sending information back to users in the response.
 * Routes that we can/will normally be creating are GET, PUT, POST, DELETE, and PATCH.
 * route functions first specify the type of route (get/put/post/delete/patch)
 * they then take in two params: the route url and a function
 * the function takes in up to three params; req (request), res (response), and next (not as commonly used)
 * req taks in request information from the user, like url parameters or form data
 * res is used to send info back to the user in the response
 * res.send(information) is good for sending base information for testing (but it is generic)
 * res.sendStatus(code) is used to send back status codes (e.g., 200 for success)
 */
app.get("/", individualLogger, (req, res) => {
    // res.send("Hello world");
    // res.sendStatus(200);
    // res.status(200).send("Hello world");
    // res.status(500).json( { message: "Server error" } );
    // res.download("/path/to/file"); // to download a file
    res.render("index", { text: "world"});
})

/**
 * import routes from file into server.js
 * use app.use() to link the route to a particular path
 * the first param is the path that we mount the routes on
 * e.g., since all the routes in the userRouter folder start with /users, we pass that in here
 * the second param is the router file we've imported
 * when called like this, the routes in userRouter are prefixed with /users
 */
const userRouter = require("./routes/users");
app.use("/users", userRouter)

/**
 * middleware functions have access to the req and res objects, and execute between receiving the req and sending the res
 * a common use of middleware is for logging
 * every piece of middleware takes in a req, res, and next param
 */

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

function individualLogger(req, res, next) {
    console.log("Individual route logger");
    next();
}


app.listen(3000);