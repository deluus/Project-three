'use strict';
module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player',{
        firstName: DataTypes.STRING
    }
