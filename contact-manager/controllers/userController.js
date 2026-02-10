const asyncHandler = require("express-async-handler");

/**
 * @desc register user 
 * @route post /users/register
 * @access public
 */

const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: "Register user" });
})

/**
 * @desc register user 
 * @route post /users/login
 * @access public
 */

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "Login user" });
})

/**
 * @desc get current user 
 * @route post /users/current
 * @access private
 */

const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Get current user" });
})

module.exports = { registerUser, loginUser, getCurrentUser}