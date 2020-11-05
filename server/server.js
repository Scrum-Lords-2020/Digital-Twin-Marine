const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

//Needed for client to interact with server
var cors = require('cors');
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

    //Passport middleware
    app.use(passport.initialize());

    //Passport config
    require("./config/passport")(passport);

    //Routes
    app.use("/api/users", users);

    const port = process.env.PORT || 5000;
    //*******May need to add port of host site here or something, process.env.PORT will find it?

    app.listen(port, () => console.log(`Server up and running on port ${port}!`));