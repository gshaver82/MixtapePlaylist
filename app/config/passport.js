const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// http://www.passportjs.org/docs/configure/ just note that the example is using MongoDB, so findOne syntax is different. I think.

passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log("[PASSPORT] verification function called");
        console.log(username);
        db.User.findOne({where: { username: username }}).then(async (user) => {
            try {
                console.log("[PASSPORT] Local Strategy async preparing to fire");
                let validated = await user.validPassword(user, password);
                console.log("[PASSPORT] Argon2 evaluated: " + validated);
                if (!user) {
                    console.log("[PASSPORT] =============Invalid username=============");
                    return done(null, false, { message: "Incorrect username." });
                } else if (!validated) {
                    console.log("[PASSPORT] =============Invalid password=============");
                    return done(null, false, { message: "Incorrect password." });
                }
                console.log("[PASSPORT] ==========The password is valid=============");
                return done(null, user);
            } catch (err) {
                return done(null, false, { message: "Invalid Credentials" });
            }
            // db.User.findOne({
            //     where: { username: username }
            // }).then((dbUser) => {
            //     console.log("Passport promise triggered");
            //     // console.log(dbUser);
            //     if (!dbUser) {
            //         console.log("Invalid Username");
            //         return done(null, false, { message: "Incorrect username." });
            //     } else if (!dbUser.validPassword(dbUser, password)) {
            //         console.log("Invalid Password");
            //         return done(null, false, { message: "Incorrect password." });
            //     }
            //     let crap = dbUser.validPassword(dbUser, password);
            //     console.log(crap + "================Authenticated=================");
            //     return done(null, dbUser);
        });
    }
));

// we are chosing to only store these aspects of the user object in the session.
passport.serializeUser((user, cb) => {
    cb(null, { id: user.id, username: user.username, role: user.role });
});

passport.deserializeUser((user, cb) => {
    cb(null, { id: user.id, username: user.username, role: user.role });
});

module.exports = passport;