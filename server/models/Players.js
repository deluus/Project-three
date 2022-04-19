'use strict';
module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player',{
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        personId: DataTypes.STRING,
        teamId: DataTypes.STRING,
        jersey: DataTypes.STRING,
    }
