const argon2 = require("argon2");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        // eslint-disable-next-line camelcase
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: { notEmpty: true }
        },
        // eslint-disable-next-line camelcase
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: { notEmpty: true }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        role: {
            type: DataTypes.STRING,
            validate: { isIn: [["user", "admin"]] }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // validate: { notEmpty: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // We're validating for a minimum length of 8 characters here. Have to figure out how to send this error down the line. Hopefully it works with the hook.
            validate: { len: [8, 128] }
        },
        // eslint-disable-next-line camelcase
        last_login: DataTypes.DATE
    });
    //this 'has many' creates Fkeys in the target (playlist and vote)
    //(not verified) on cascade should mean that when a user is deleted
    //all of their votes and playlists also get deleted
    User.associate = function (models) {
        User.hasMany(models.Playlist, {
            onDelete: "cascade"
        });
        User.hasMany(models.Vote, {
            onDelete: "cascade"
        });
    };
    User.prototype.validPassword = async (user, password) => {
        try {
            console.log("[USER] validPasword triggered");
            let passwordCheck = await argon2.verify(user.password, password);
            console.log("[USER] argon2.verify evaluates to: " + passwordCheck);
            return passwordCheck;
        } catch (err) {
            console.log(err);
        }
    };
    User.addHook("beforeCreate", async (user) => {
        try {
            user.password = await argon2.hash(user.password);
        } catch (err) {
            //reevaluate what we might actually want here.
            console.log(err);
        }
    });
    return User;
};