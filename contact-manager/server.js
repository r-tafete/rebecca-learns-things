const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler.js");
const app = express();
const port = process.env.PORT || 3001;

// import and use your routes
const contactsRoutes = require('./routes/contacts.js');
app.use("/api/contacts", contactsRoutes);


// don't forget to import the middleware; both baked into express and custom
// import middleware after routes so it can catch route erors
app.use(express.json());
app.use(errorHandler);


// listen on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
