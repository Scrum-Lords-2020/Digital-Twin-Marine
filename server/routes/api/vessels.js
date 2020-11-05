const express = require("express");
const router = express.Router();

//May need to use encryption for some things
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
//const keys = require("../../config/keys");

//May want validate vessels, see users for example

//Load the vessel model
const Vessel = require("../../models/Vessel");

//Used for registering validation
//May want to change access

//@route POST api/vessels/add
//@desc Add vessel
//@access Public
router.post("/add", (req, res) => {
    //Form validation(commented out until decide if needed)

    // const { errors, isValid } = validateRegisterInput(req.body);

    // //Check validation
    // if(!isValid) {
    //     return res.status(400).json(errors);
    // }

    Vessel.findOne({ IMO: req.body.IMO }).then(vessel => {
        if(vessel) {
            return res.status(400).json({ email: "Vessel already exists" });
        }
        else {
            const newVessel = new Vessel({
                name: req.body.name,
                IMO: req.body.IMO,
                serviceType: req.body.serviceType
            });
            newVessel
                    .save()
                    .then(vessel => res.json(vessel))
                    //.catch(err => console.log(err));
        }
    });
});

module.exports = router;