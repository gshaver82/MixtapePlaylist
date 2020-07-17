/* eslint-disable camelcase */

module.exports = function (sequelize, DataTypes) {
    const Playlist = sequelize.define("Playlist", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        //this string is a CSV of songs that will be manually input as a MVP
        //later moving to a table junction of a database table of songs
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: { notEmpty: true }
        },
        playlist_link: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: { notEmpty: true }
        }
    });
    //this 'has many' means the playlist can have many upvotes associated with it
    //will create an FKey in the vote table that references this playlist table.
    Playlist.associate = function (models) {
        Playlist.belongsTo(models.User);
        //removed default Null to allow a playlist that has no votes.
        //maybe we should force not null and somehow automatically have the author
        //of the playlist upvote their own playlist, like reddit does
        Playlist.hasMany(models.Vote);
        //this creates a junction table to associate many songs with many playlists
        //1 song can be in many playlists and one playlist can have many songs
        Playlist.belongsToMany(models.Song, {
            through: "playlist_song_junction_table"
        });
    };
    return Playlist;
};