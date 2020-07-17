/* eslint-disable camelcase */

module.exports = function (sequelize, DataTypes) {
    const playlist_song_junction_table = sequelize.define("playlist_song_junction_table", {
        song_order: {
            // Such a big oops. Can't drop the table now though.
            type: DataTypes.STRING,
            allowNull: true,
            validate: { notEmpty: true }
        },
    },
    {
        freezeTableName: true
    });
    // playlist_song_junction_table.associate = function (models) {
    //     playlist_song_junction_table.belongsTo(models.Playlist);
    //     playlist_song_junction_table.belongsTo(models.Song);
    // };
    return playlist_song_junction_table;
};