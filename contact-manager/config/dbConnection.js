/**
 * Here, we are connecting to our db instance on mongo.
 * The general layout for connectDb, incl the async function and the try/catch + await mongoose.connect is all boilerplate
 */
const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected: ", connect.connection.host, connect.connections.name);

    } catch(err) {
        console.log(err);
        process.exit(1);
    }

};

module.exports = connectDb;
