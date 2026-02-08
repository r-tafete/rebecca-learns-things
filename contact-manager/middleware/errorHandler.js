// here, we are creating custom error handling middleware so the error string returned is in json
// by default, the string returned from throwing a new Error is in html

const { constants } = require("../constants");


// this function takes in the standard 3 middleware params (req, res, next) + the triggering error
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(statusCode);

    switch (statusCode) {
        case (constants.NOT_FOUND):
            res.json({ title: "Not found", message: err.message, status: statusCode });
            break;

        case (constants.VALIDATION_ERROR):
            res.json({ title: "Validation error", message: err.message, status: statusCode });
            break;

        case (constants.FORBIDDEN):
            res.json({ title: "Access forbidden", message: err.message, status: statusCode });
            break;

        case (constants.UNAUTHORIZED):
            res.json({ title: "Unauthorized", message: err.message, status: statusCode });
            break;

        case (constants.SERVER_ERROR):
            res.json({title: "Server error", message: err.message, status: statusCode});
            break;
        
        default:
            console.log("No error");
    }
}

// remember to export your function so the rest of the app can find it
module.exports = errorHandler;