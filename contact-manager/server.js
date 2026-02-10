const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler.js");
const app = express();
const port = process.env.PORT || 3001;

// don't forget to import the middleware; both baked into express and custom
app.use(express.json());

// import and use your routes
const contactsRoutes = require('./routes/contacts.js');
const userRoutes = require("./routes/user.js")
const connectDb = require("./config/dbConnection.js");

app.use("/api/contacts", contactsRoutes);
app.use("/api/users", userRoutes)
connectDb();

// import handlers after routes so it can catch route erors
app.use(errorHandler);


// listen on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
