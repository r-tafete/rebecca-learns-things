// we're making these functions async for integration with mongo
// this is because mongo returns promises
// since the functions are async, we'd typically wrap them all in a try/catch block
// but that can get bulky, so we use another piece of middleware to help with async function and error handlintg
const asyncHandler = require("express-async-handler");


/**
 * @desc Get all contacts
 * @route GET /api/contacts
 * @access public
 */
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get all contacts" });
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
    res.status(201).json({ message: "Create new contact" });
});


/**
 * @desc Get a specific contact
 * @route GET /api/contacts/:id
 * @access public
 */
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get contact ${req.params.id} `});
});

/**
 * @desc Update a contact
 * @route PUT /api/contacts/:id
 * @access public
 */

const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update contact ${req.params.id}` });
});


/**
 * @desc Delete a contact
 * @route DELETE /api/contacts/:id
 * @access public
 */

const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete contact ${req.params.id}` });
});

module.exports = {getContacts, getContact, updateContact, createContact, deleteContact}
