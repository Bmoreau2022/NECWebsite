const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Add sessions
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

//Configure body-parser and set static dir path.
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Initialize passport
app.use(session({
    secret: "MyLittleSecretThatIdontWantOthersToKnow",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Configure Mongoose
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            minLength: 3
        },
        password: {
            type: String,

        },
        confirm: {
            type: Boolean,

        },
        fullname: {
            type: String,
        },
        profile: {
            type: String,
        },
        assoc: {
            type: String,
        },

        eventsliked: [{
            year: String,
            event: String
        }]
    }
)

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3000, function () {
    console.log("server started at 3000");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/homepage.html");
});

app.get('/get_current_user', function (req, res) {
    if (req.isAuthenticated()) {
        res.send({
            message: "success",
            data: req.user
        })
    } else {
        res.send({
            message: "user not found",
            data: {}
        })
    }
});

app.get('/get_car_by_id', function (req, res) {
    cars.findOne({"_id": req.query.stock_num}, function (err, data) {
        if (err) {
            res.send({
                "message": "error",
                "data": {}
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});

app.get('/register', (req, res) => {
    if (req.query.error) {
        res.redirect("/register.html?error=" + req.query.error);
    } else {
        res.redirect("/register.html");
    }
});

app.post('/register', (req, res) => {
    const newUser = {
        username: req.body.username,
        fullname: req.body.fullname,
        //assoc: req.body.assoc,
        profile: req.body.profile,
    }
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/register.html?error=' + err)
        } else {/*
            if (req.body.password !== req.body.confirm) {
                console.log(err);
                res.redirect('/register?error= Passwords do not match');
            } else if (req.body.password.length < 5) {
                console.log(err);
                res.redirect('/register?error= Password must be 5 characters or greater');
            } else {*/
            console.log(user);
            const authenticate = passport.authenticate('local');
            authenticate(req, res, () => {
                res.redirect('/')
            });
        }
    })
})
;

app.get('/login', (req, res) => {
    if (req.query.error) {
        res.redirect("/login.html?error=" + req.query.error);
    } else {
        res.redirect("/login.html");
    }
});

app.post('/login', (req, res) => {
    console.log(req.body.password);
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/login?error=Database error: Invalid username/password")
        } else {
            const authenticate = passport.authenticate('local', {
                successRedirect: "/",
                failureRedirect: "/login?error=user does not exist or user name and password do not match"
            })
            authenticate(req, res);
        }
        /*res.redirect("../src/account.html");*/
    })
});


app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/")
});

app.get("/account", (req, res) => {
    //A page can be viewed only after login
    if (req.isAuthenticated()) {
        res.sendFile(__dirname + "/src/account.html");
    } else {
        res.redirect("/login.html?error= You need to be logged in");
    }
});

app.post("/account", (req, res) => {
    const user = {
        username: req.body.username,
        fullname: req.body.fullname,
        profile: req.body.profile,
        assoc: req.body.assoc,
        eventsliked: req.body.eventsliked
    }
    if (req.isAuthenticated()) {
        res.send({
            message: "success",
            data: user
        })
    } else {
        res.send({
            message: "failed",
            data: {}
        })
    }
});