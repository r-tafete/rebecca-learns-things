const mongoose = require("mongoose");

/**
 * This is our contact schema-- wha5 do we want our contacts object to have?
 */
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add email"]
    },
    phone: {
        type: String,
        required: [true, "Please add phone number"]
    }
},
    {
        timestamps: true

    }
);

module.exports = mongoose.model("Contact", contactSchema);

/**
 * Now that we've created the schema for the database, it's time to apply our CRUD functions so that we can write to and read from the db
 * we'll be editing our controller file for that
 */