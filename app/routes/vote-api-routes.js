const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    app.post("/api/upvote", isAuthenticated, async (req, res) => {
        console.log("[VOTE-API] Upvote Firing");
        try {
            //this code looks for a record with a userid and playlist id in the votes Table
            //if it doesnt find it then itll create whats in the where clause along with any defaults.
            //this can also be used to be stored to a variable and send back error if we want.
            await db.Vote.findOrCreate({
                where: {
                    UserId: req.user.id,
                    PlaylistId: req.body.playlistId,
                },
                defaults: {
                    upvote: 1
                }
            });
            res.json("upvoted!");
        } catch (err) {
            console.log(err);
        }
    });

    app.post("/api/downvote", isAuthenticated, async (req, res) => {
        console.log("[VOTE-API] Downvote Firing");
        try {
            await db.Vote.findOrCreate({
                where: {
                    UserId: req.user.id,
                    PlaylistId: req.body.playlistId,
                },
                defaults: {
                    upvote: -1
                }
            });
            res.json("downvoted!");
        } catch (err) {
            console.log(err);
        }
    });

    app.post("/api/revote", isAuthenticated, async (req, res) => {
        console.log("[VOTE-API] REVOTE Firing");
        try {
            await db.Vote.update({ upvote: req.body.value }, {
                where: {
                    UserId: req.user.id,
                    PlaylistId: req.body.playlistId,
                }
            });
            res.json("downvoted!");
        } catch (err) {
            console.log(err);
        }
    });

};