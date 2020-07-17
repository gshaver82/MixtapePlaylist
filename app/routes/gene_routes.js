/* eslint-disable camelcase */

// req.body.playlistTitle,
//     req.body.playlistDescription,
//     req.body.playlistAuthorId,
//     req.body.playlistContents

// playlistContents = [
//     { songName: "Name of the song", songArtist: "Artist of the song" },
//     { songName: "Name of the song", songArtist: "Artist of the song" }
// ]
// const isAuthenticated = require("../config/middleware/isAuthenticated");

const db = require("../models");
module.exports = function (app) {

    //working in postman
    app.get("/api/playlists_destroytest", async (req, res) => {
        reqtest = {};
        reqtest.body = {
            playlistTitle: "incomingPlaylistTitle",
        };
        useridQuery = await db.Playlist.findOne({
            where: {
                title: reqtest.body.playlistTitle
            },
            attributes: [
                "id",
            ],
        });
        console.log("useridQuery.dataValues.id");
        console.log(useridQuery.dataValues.id);
        // console.log("reqtest.user.id");
        // console.log(reqtest.user.id);
        if (useridQuery.dataValues.id === 3) {
            try {
                await db.Playlist.destroy({
                    where: {
                        title: reqtest.body.playlistTitle
                    }
                });
                res.json("deleted playlist");
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("not authorised");
            res.json("not authorised");
        }
    });


    // when frontend sends data
    // change .get to post
    // change req to reqtest and delete 10 lines of code immediately after app.post
    // this will take out the dummy testing object and use the incoming object instead

    //working code that has no Auth

    // app.get("/api/playlists_destroytest", async (req, res) => {
    //     reqtest = {};
    //     reqtest.body = {
    //         playlistTitle: "incomingPlaylistTitle",
    //         playlistAuthorId: 1,
    //         playlistDescription: "incomingPlaylistDescription",
    //         playlistContents: [
    //             { songName: "incoming song 1", songArtist: "incoming artist 1" },
    //             { songName: "incoming song 2", songArtist: "incoming artist 2" }
    //         ]
    //     };
    //     try {
    //         await db.Playlist.destroy({
    //             where: {
    //                 title: reqtest.body.playlistTitle
    //             }
    //         });
    //         res.json("deleted playlist");
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });


    //     when frontend sends data
    //     change .get to post
    //     change req to reqtest and delete 10 lines of code immediately after app.post
    //     this will take out the dummy testing object and use the incoming object instead
    app.get("/api/playlists_createtest", async (req, res) => {
        reqtest = {};
        reqtest.body = {
            playlistTitle: "incomingPlaylistTitle",
            playlistAuthorId: 1,
            playlistDescription: "incomingPlaylistDescription",
            playlistContents: [
                { songName: "incoming song 1", songArtist: "incoming artist 1" },
                { songName: "incoming song 2", songArtist: "incoming artist 2" }
            ]
        };
        // console.log("beforecreate");
        // console.log(reqtest);
        // console.log("reqtest.body.playlistContents");
        // console.log(reqtest.body.playlistContents);
        // console.log("reqtest.body.playlistContents[0].songName");
        // console.log(reqtest.body.playlistContents[0].songName);
        try {
            //this will search for the incoming playlist and log out duplicate found if playlist already exists.
            const playlistduplicatesearch = await db.Playlist.findOne({
                where: {
                    title: reqtest.body.playlistTitle
                }
            });
            if (playlistduplicatesearch) {
                console.log("duplicate found");
                res.json("duplicate found");
            } else {
                const PlaylistCreated = await db.Playlist.create({
                    title: reqtest.body.playlistTitle,
                    UserId: reqtest.body.playlistAuthorId,
                    description: reqtest.body.playlistDescription
                });
                console.log("created playlist");
                res.json("created playlist");
                // console.log("PlaylistCreated");
                // console.log(PlaylistCreated);
                // console.log("PlaylistCreated.dataValues.id");
                // console.log(PlaylistCreated.dataValues.id);
                const NewPlaylistID = PlaylistCreated.dataValues.id;
                for (i = 0; i < reqtest.body.playlistContents.length; i++) {
                    const findOrCreateResult = await db.Song.findOrCreate({
                        where: {
                            song_title: reqtest.body.playlistContents[i].songName,
                            song_artist: reqtest.body.playlistContents[i].songArtist
                        }
                    });
                    console.log("findOrCreateResult[0].dataValues.id-----------------------");
                    console.log(findOrCreateResult[0].dataValues.id);
                    let NewSongID = findOrCreateResult[0].dataValues.id;
                    // song ID gets associated with playlist id in the junction Table
                    // using the array index as the value for the song order in junction table
                    await db.playlist_song_junction_table.create({
                        PlaylistId: NewPlaylistID,
                        SongId: NewSongID,
                        song_order: i,
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    });
};