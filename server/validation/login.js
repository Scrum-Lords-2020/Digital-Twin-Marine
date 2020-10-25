//Login script used to let users login

const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    //Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Check if the email field is empty
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    //Check if email is valid
    else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Check if the password field is empty
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};