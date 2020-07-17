/* eslint-disable camelcase */

module.exports = function (sequelize, DataTypes) {
    const Song = sequelize.define("Song", {
        song_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true },
            unique: true
        },
        song_artist: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        }
    });
    //this creates a junction table to associate many songs with many playlists
    //1 song can be in many playlists and one playlist can have many songs
    Song.associate = function (models) {
        Song.belongsToMany(models.Playlist, {
            through: "playlist_song_junction_table"
        });
    };
    return Song;
};