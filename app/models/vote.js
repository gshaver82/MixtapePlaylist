/* eslint-disable camelcase */

module.exports = function (sequelize, DataTypes) {
    const Vote = sequelize.define("Vote", {
        upvote: DataTypes.INTEGER,
    });
    Vote.associate = function (models) {
        //the belongs to command is not needed? it only serves to work with the "has many"
        //in the other tables... this will essentially act like the "has many" has null Not allowed
        //so each vote belongs to only ONE user and ONE playlist.
        Vote.belongsTo(models.User, {
            // onDelete: "cascade"
        });
        Vote.belongsTo(models.Playlist, {
            // onDelete: "cascade"
        });
    };
    return Vote;
};