// we're making these functions async for integration with mongo
// this is because mongo returns promises
// since the functions are async, we'd typically wrap them all in a try/catch block
// but that can get bulky, so we use another piece of middleware to help with async function and error handlintg
const asyncHandler = require("express-async-handler");

// import our contact mongo model
const Contact = require("../models/contactModel");


/**
 * @desc Get all contacts
 * @route GET /api/contacts
 * @access public
 */
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find(); // .find() is a method exposed from Mongo after you import the schema. it is async
    res.status(200).json(contacts);
});

/**
 * @desc Create new contact
 * @route POST /api/contacts
 * @access public
 */
const createContact = asyncHandler(async (req, res) => {
    // destructure the body into its parts here
    const { name, email, phone } = req.body;

    // throw error if parts are missing.
    if (!(name && email && phone)) {
        res.status(400);
        throw new Error("All fields are required");
    }

    // if not empty, create a new Contact object
    const contact = await Contact.create({ name, email, phone}); // these are coming from req.body -- previously destructured
    res.status(201).json(contact);
});


/**
 * @desc Get a specific contact
 * @route GET /api/contacts/:id
 * @access public
 */
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

/**
 * @desc Update a contact
 * @route PUT /api/contacts/:id
 * @access public
 */

const updateContact = asyncHandler(async (req, res) => {
    // to update the contact, we must first fetch the contact
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { returnDocument: "after" } // return the document AFTER the update is applied
        // (by default, findByIdAndUpdate returns the doc as it was before it was updated)
    );

    res.status(200).json(updatedContact);
});


/**
 * @desc Delete a contact
 * @route DELETE /api/contacts/:id
 * @access public
 */

const deleteContact = asyncHandler(async (req, res) => {
    // to delete a contact, we must first fetch the contact
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndDelete(req.params.id); // delete from db
    res.status(200).json(contact);
});

module.exports = {getContacts, getContact, updateContact, createContact, deleteContact}
