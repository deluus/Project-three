'use strict';
module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player',{
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        personId: DataTypes.STRING,
        teamId: DataTypes.STRING,
        jersey: DataTypes.INTEGER,
        position: DataTypes.STRING,
        yearsPro: DataTypes.INTEGER,
        heightMeters: DataTypes.FLOAT,
    }, {});
    Player.associate = models => {
        Player.belongsTo(models.Year,{
            foreignKey: 'YearId',
            onDelete: 'CASCADE'
        });
    };
    return Player;
};
