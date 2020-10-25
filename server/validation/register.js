//Register script for registering new users.

const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //Convert empty fields to an empty string so we can use validator
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Check if the name is empty
    if(Validator.isEmpty(data.name)) {
       errors.name = "Name field is required";
    }

    //Check if the email is valid
    //Check if empty
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    //Check if valid
    else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Check if the passwords are valid
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    //Check if the password confirmation was entered
    if(Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    //Check if the password has a character count in the allowed range 
    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    //Check if the password and password confirmation are the same
    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must mathch";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};